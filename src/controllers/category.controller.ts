import { Request, Response } from "express";
import Knex from "../knex/knex";
import Category from "../models/category.interface";
import ProductCategory from "../models/product-category.interface";
import Product from "../models/product.interface";
import { Constants } from "../utils/constants.utils";
import { CoreUtils } from "../utils/core.utils";
import { ResponseUtils } from "../utils/response.utils";

class CategoryController {
  findAll = async (req: Request, res: Response) => {
    try {
      const category = await Knex<Category>("categories");
      res.json(category);
    } catch (err: any) {
      res.status(Constants.HTTP_500).send({ error: Constants.SERVER_ERROR });
    }
  };
  create = async (req: Request, res: Response) => {
    const { name, parent_id, description, status } = req.body;
    const category: Category = { name, parent_id, description, status };
    try {
      await Knex<Category>("categories").insert(category);
      res.status(Constants.HTTP_201).json(ResponseUtils.insertRespose());
    } catch (error) {
      res.status(Constants.HTTP_500).send({ error: Constants.SERVER_ERROR });
    }
  };

  findById = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const catetory = await Knex<Category>("categories").where("id", id).first();
    if (!catetory) {
      res.status(Constants.HTTP_404).send({ error: Constants.NOT_FOUND });
    }
    res.json(catetory);
  };

  update = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const { name, parent_id, description, status } = req.body;
    const category: Category = { name, parent_id, description, status };
    try {
      const editData = await Knex<Category>("categories")
        .where("id", id)
        .first();
      if (editData?.status !== status) {
        // for all child categories and product deactive process of selected category
        const allCategory = await Knex<Category>("categories");
        const categorisIds = CoreUtils.findAllCategoriesId(allCategory, id);
        // update all chiild category status
        await Knex<Category>("categories")
          .whereIn("id", categorisIds)
          .update({ status });
        categorisIds.push(id);
        const productIds: number[] = await Knex<ProductCategory>(
          "product_categories"
        )
          .whereIn("category_id", categorisIds)
          .pluck("product_id");
        // update all product status
        await Knex<Product>("products")
          .whereIn("id", productIds)
          .update({ status });
      }
      const update = await Knex<Category>("categories")
        .where({ id })
        .update(category);
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
      const del = await Knex("categories").where({ id }).del();
      if (del) {
        res.status(Constants.HTTP_204).end();
      } else {
        res.status(Constants.HTTP_404).send({ error: Constants.NOT_FOUND });
      }
    } catch (error) {
      res.status(Constants.HTTP_500).send({ error: Constants.SERVER_ERROR });
    }
  };
}

export const categoryController = new CategoryController();
