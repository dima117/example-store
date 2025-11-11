import express from 'express';

import type { CheckoutRequest, CheckoutResponse } from '../common/types';
import type { ExampleDataSource } from './example-data-source';
import { ApiError, errorHandlerMiddleware } from './utils';

/** Создает роутер для обработки запросов к API */
export function createApiRouter(dataSource: ExampleDataSource) {
    const apiRouter = express.Router();

    apiRouter.get('/products', (_req, res) => {
        const products = dataSource.getProducts();
        res.json(products);
    });

    apiRouter.get('/products/:productId', (req, res) => {
        const productId = Number(req.params.productId);
        const product = dataSource.getProductById(productId);
        res.json(product);
    });

    apiRouter.post('/checkout', express.json(), (req, res, _next) => {
        const orderParams: CheckoutRequest = req.body;
        const { id, totalAmount, createdAt } = dataSource.checkout(orderParams);
        const response: CheckoutResponse = { id, totalAmount, createdAt };
        res.json(response);
    });

    apiRouter.use('*all', (_req, _res) => {
        throw new ApiError('Маршрут не найден', 404);
    });

    apiRouter.use(errorHandlerMiddleware);

    return apiRouter;
}
