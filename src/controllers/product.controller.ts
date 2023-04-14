import { Request, Response } from "express";
import Knex from "../knex/knex";
import ProductAttributes from "../models/product-attributes.interface";
import ProductCategory from "../models/product-category.interface";
import Product from "../models/product.interface";
import { Constants } from "../utils/constants.utils";
import { ResponseUtils } from "../utils/response.utils";

class ProductController {
  findAll = async (req: Request, res: Response) => {
    try {
      const products = await Knex<Product>("products");
      res.json(products);
    } catch (err: any) {
      res.status(Constants.HTTP_500).send({ error: Constants.SERVER_ERROR });
    }
  };
  create = async (req: Request, res: Response) => {
    const {
      name,
      description,
      price,
      image_url,
      status,
      categories,
      attributes,
    } = req.body;
    try {
      const inserted = await Knex<Product>("products").insert({
        name,
        description,
        price,
        image_url,
        status,
      });
      const product_id = inserted[0];
      // product category data
      const productCategories: ProductCategory[] = [];
      categories.forEach((categoryId: number) => {
        productCategories.push({
          category_id: categoryId,
          product_id: product_id,
        });
      });
      await Knex("product_categories").insert(productCategories);
      // product attributes data
      const productAttributes: ProductAttributes[] = [];
      attributes.forEach((attributes_id: number) => {
        productAttributes.push({
          attributes_id: attributes_id,
          product_id: product_id,
        });
      });
      await Knex("product_attributes").insert(productAttributes);
      res.status(Constants.HTTP_201).json(ResponseUtils.insertRespose());
    } catch (error) {
      res.status(Constants.HTTP_500).send({ error: Constants.SERVER_ERROR });
    }
  };

  findById = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const product: Product = await Knex("products").where("id", id).first();
    if (!product) {
      res.status(Constants.HTTP_404).send({ error: Constants.NOT_FOUND });
    }
    const productCategories = await Knex<ProductCategory>("product_categories")
      .where("product_id", id)
      .pluck("category_id");
    product.categories = productCategories;
    const productAttributes = await Knex<ProductAttributes>(
      "product_attributes"
    )
      .where("product_id", id)
      .pluck("attributes_id");
    product.attributes = productAttributes;
    res.json(product);
  };

  update = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const {
      name,
      description,
      price,
      image_url,
      status,
      categories,
      attributes,
    } = req.body;
    try {
      await Knex("product_categories").where("product_id", id).del();
      await Knex("product_attributes").where("product_id", id).del();
      const update = await Knex<Product>("products").where({ id }).update({
        name,
        description,
        price,
        image_url,
        status,
      });

      // product category data
      const productCategories: ProductCategory[] = [];
      categories.forEach((categoryId: number) => {
        productCategories.push({
          category_id: categoryId,
          product_id: id,
        });
      });
      await Knex("product_categories").insert(productCategories);
      // product attributes data
      const productAttributes: ProductAttributes[] = [];
      attributes.forEach((attributes_id: number) => {
        productAttributes.push({
          attributes_id: attributes_id,
          product_id: id,
        });
      });
      await Knex("product_attributes").insert(productAttributes);

      if (update) {
        res.json(ResponseUtils.updateRespose());
      } else {
        res.status(Constants.HTTP_404).send({ error: Constants.NOT_FOUND });
      }
    } catch (error) {
      res.status(Constants.HTTP_500).send({ error: Constants.SERVER_ERROR });
    }
  };

  delete = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    try {
      const del = await Knex("products").where({ id }).del();
      await Knex("product_categories").where("product_id", id).del();
      await Knex("product_attributes").where("product_id", id).del();
      if (del) {
        res.status(Constants.HTTP_204).end();
      } else {
        res.status(Constants.HTTP_404).send({ error: Constants.NOT_FOUND });
      }
    } catch (error) {
      res.status(Constants.HTTP_500).send({ error: Constants.SERVER_ERROR });
    }
  };

  productFilter = async (req: Request, res: Response) => {
    try {
      const { category_id, status, name } = req.query;
      let query = Knex.select(
        "products.id",
        "product_categories.category_id",
        "products.name",
        "products.description",
        "products.status"
      )
        .from("products")
        .innerJoin(
          "product_categories",
          "products.id",
          "product_categories.product_id"
        );
      if (category_id) {
        query.where("product_categories.category_id", Number(category_id));
      }
      if (status) {
        query.where("products.status", status);
      }
      if (name) {
        query.where("products.name", "like", `%${name}%`);
      }
      const products = await query;
      res.json(products);
    } catch (err: any) {
      res.status(Constants.HTTP_500).send({ error: Constants.SERVER_ERROR });
    }
  };
}

export const productController = new ProductController();
