import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Knex from "../knex/knex";

enum Status {
  Status = "active",
  Inactive = "inactive",
}
export const validateCategory = [
  // use the check function to define validation rules
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .custom(async (name, { req }) => {
      const id: number = req?.params?.id;
      let query = Knex("categories").where({ name });
      if (id) {
        query.whereNot({ id });
      }
      const categoryExists = await query.first();
      if (categoryExists) {
        throw new Error("Category already exists");
      }
      return true;
    }),
  check("status")
    .isIn([Status.Status, Status.Inactive])
    .withMessage("Status must be either active or inactive"),
  // use the validationResult function to check for errors
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateAttributes = [
  // use the check function to define validation rules
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .custom(async (name, { req }) => {
      const id: number = req?.params?.id;
      let attrExists = null;
      if (id) {
        attrExists = await Knex("attributes")
          .where({ name })
          .whereNot({ id })
          .first();
      } else {
        attrExists = await Knex("attributes").where({ name }).first();
      }
      if (attrExists) {
        throw new Error("Attributes already exists");
      }
      return true;
    }),
  check("variants")
    .isArray()
    .notEmpty()
    .withMessage("variants must be an array"),
  // use the validationResult function to check for errors
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateProduct = [
  // use the check function to define validation rules
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .custom(async (name, { req }) => {
      const id: number = req?.params?.id;
      let query = Knex("products").where({ name });
      if (id) {
        query.whereNot({ id });
      }
      const productExists = await query.first();
      if (productExists) {
        throw new Error("Product already exists");
      }
      return true;
    }),
  check("price").notEmpty().isNumeric().withMessage("Price is required"),
  check("image_url").notEmpty().withMessage("Image is required"),
  check("status")
    .isIn([Status.Status, Status.Inactive])
    .withMessage("Status must be either active or inactive"),
  check("categories")
    .isArray()
    .notEmpty()
    .withMessage("Category must be an array"),
  check("attributes")
    .isArray()
    .notEmpty()
    .withMessage("Attributes must be an array"),
  // use the validationResult function to check for errors
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
