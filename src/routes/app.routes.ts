import express from "express";
import { attributesController } from "../controllers/attributes.controller";
import { categoryController } from "../controllers/category.controller";
import { productController } from "../controllers/product.controller";
import {
  validateAttributes,
  validateCategory,
  validateProduct,
} from "../middleware/validation.middleware";
const appRouter = express.Router();
/* categories routes */
appRouter.get("/category", categoryController.findAll);
appRouter.post("/category", validateCategory, categoryController.create);
appRouter.get("/category/:id", categoryController.findById);
appRouter.patch("/category/:id", validateCategory, categoryController.update);
appRouter.delete("/category/:id", categoryController.delete);
/* attributes routes */
appRouter.get("/attributes", attributesController.findAll);
appRouter.post("/attributes", validateAttributes, attributesController.create);
appRouter.get("/attributes/:id", attributesController.findById);
appRouter.patch(
  "/attributes/:id",
  validateAttributes,
  attributesController.update
);
appRouter.delete("/attributes/:id", attributesController.delete);
/* product routes */
appRouter.get("/product", productController.findAll);
appRouter.post("/product", validateProduct, productController.create);
appRouter.get("/product/:id", productController.findById);
appRouter.patch("/product/:id", validateProduct, productController.update);
appRouter.delete("/product/:id", productController.delete);
appRouter.get("/product-filter", productController.productFilter);

export default appRouter;
