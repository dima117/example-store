import express from 'express';
import { createApiRouter } from './create-api-router';
import { ExampleDataSource } from './example-data-source';
import { createViteServer } from './create-vite-server';

/**
 * Параметры для создания сервера приложения
 */
interface CreateServerArgs {
    templateFilePath: string;
    dataFilePath: string;
}

/**
 * Создает и настраивает Express-сервер с поддержкой SSR через Vite
 * Обрабатывает API-запросы и рендеринг страниц на сервере
 */
export async function createServer({ dataFilePath, templateFilePath }: CreateServerArgs) {
    const app = express();

    const dataSource = new ExampleDataSource(dataFilePath);

    const { middlewares, indexHtml } = await createViteServer(templateFilePath);

    // client code
    app.use(middlewares);

    // index
    app.get('/', indexHtml);
    app.get('/catalog', indexHtml);
    app.get('/catalog/:id', indexHtml);
    app.get('/contacts', indexHtml);
    app.get('/cart', indexHtml);

    // api
    app.use('/api', createApiRouter(dataSource));

    return app;
}
