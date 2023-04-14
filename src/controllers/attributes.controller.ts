import { Request, Response } from "express";
import Knex from "../knex/knex";
import AttributesVariants from "../models/attributes-variants.interface";
import Attributes from "../models/attributes.interface";
import { Constants } from "../utils/constants.utils";
import { ResponseUtils } from "../utils/response.utils";

class AttributesController {
  findAll = async (req: Request, res: Response) => {
    try {
      const attributes = await Knex<Attributes>("attributes");
      res.json(attributes);
    } catch (err: any) {
      res.status(Constants.HTTP_500).send({ error: Constants.SERVER_ERROR });
    }
  };
  create = async (req: Request, res: Response) => {
    const { name, variants } = req.body;
    try {
      const inserted = await Knex<Attributes>("attributes").insert({ name });
      const attributes_id = inserted[0];
      const variantsData: AttributesVariants[] = [];
      variants.forEach((variant: string) => {
        variantsData.push({
          attributes_id: attributes_id,
          variant_name: variant,
        });
      });
      await Knex("attributes_variant").insert(variantsData);
      res.status(Constants.HTTP_201).json(ResponseUtils.insertRespose());
    } catch (error) {
      res.status(Constants.HTTP_500).send({ error: Constants.SERVER_ERROR });
    }
  };

  findById = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const attributes: Attributes = await Knex("attributes")
      .where("id", id)
      .first();
    if (!attributes) {
      res.status(Constants.HTTP_404).send({ error: Constants.NOT_FOUND });
    }
    const attributesVariant = await Knex<AttributesVariants>(
      "attributes_variant"
    )
      .where("attributes_id", id)
      .pluck("variant_name");
    attributes.variants = attributesVariant;
    res.json(attributes);
  };

  update = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const { name, variants } = req.body;
    try {
      await Knex("attributes_variant").where("attributes_id", id).del();
      const update = await Knex<Attributes>("attributes")
        .where({ id })
        .update({ name });

      const variantsData: AttributesVariants[] = [];
      variants.forEach((variant: string) => {
        variantsData.push({
          attributes_id: id,
          variant_name: variant,
        });
      });
      await Knex("attributes_variant").insert(variantsData);

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
      const del = await Knex("attributes").where({ id }).del();
      await Knex("attributes_variant").where("attributes_id", id).del();
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

export const attributesController = new AttributesController();
