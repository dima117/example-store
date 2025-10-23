import express from "express";

import type { CheckoutRequest } from "../common/types";
import type { ExampleDataSource } from "./example-data-source";
import { ApiError, errorHandlerMiddleware } from "./utils";

/**
 * Создает роутер для обработки запросов к API
 */
export function createApiRouter(dataSource: ExampleDataSource) {
  const apiRouter = express.Router();

  apiRouter.get("/sections", (_req, res) => {
    const sections = dataSource.getSections();
    res.json(sections);
  });

  apiRouter.get("/sections/:id/products", (req, res) => {
    const sectionId = Number(req.params.id);
    const products = dataSource.getProductsBySection(sectionId);
    res.json(products);
  });

  apiRouter.get("/products/promo", (_req, res) => {
    const promoProducts = dataSource.getPromoProducts();
    res.json(promoProducts);
  });

  apiRouter.get("/products/:productId", (req, res) => {
    const productId = Number(req.params.productId);
    const product = dataSource.getProductById(productId);
    res.json(product);
  });

  apiRouter.post("/checkout", express.json(), (req, res, _next) => {
    const orderParams: CheckoutRequest = req.body;
    const { id, totalAmount, createdAt } = dataSource.checkout(orderParams);
    res.json({ id, totalAmount, createdAt });
  });

  apiRouter.use("*all", (_req, _res) => {
    throw new ApiError("Маршрут не найден", 404);
  });

  apiRouter.use(errorHandlerMiddleware);

  return apiRouter;
}
