import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createServer as createViteServer } from "vite";
import {
  Section,
  Product,
  ProductShortInfo,
  OrderData,
  OrderItem,
  CreateOrderRequest,
  CreateOrderResponse,
} from "./src/types";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class ExampleDataSource {
  private sections: Section[] = [];
  private products: Product[] = [];
  private orders: OrderData[] = [];
  private nextOrderId: number = 1;

  constructor(dataFilePath: string = "products.json") {
    try {
      const data = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, dataFilePath), "utf-8")
      );
      this.sections = data.sections;
      this.products = data.products;
    } catch (error) {
      throw new Error(`Ошибка при загрузке данных из файла ${dataFilePath}:`);
    }
  }

  getSections(): Section[] {
    return [...this.sections].sort((a, b) => a.sortOrder - b.sortOrder);
  }

  getProductsBySection(sectionId: number): ProductShortInfo[] {
    return this.products
      .filter((product) => product.section === sectionId)
      .map(({ id, name, price, section }) => ({ id, name, price, section }));
  }

  getProductById(productId: number): Product | undefined {
    return this.products.find((product) => product.id === productId);
  }

  getPromoProducts(count: number = 5): ProductShortInfo[] {
    return this.products
      .slice(0, count)
      .map(({ id, name, price, section }) => ({ id, name, price, section }));
  }

  createOrder(orderData: CreateOrderRequest): OrderData {
    const orderItems: OrderItem[] = [];
    let totalAmount = 0;

    for (const item of orderData.items) {
      const product = this.getProductById(item.id);

      if (!product) {
        throw new ApiError(`Товар с ID ${item.id} не найден`, 400);
      }

      const itemTotal = product.price * item.count;

      orderItems.push({
        id: item.id,
        count: item.count,
        price: product.price,
        total: itemTotal,
      });

      totalAmount += itemTotal;
    }

    const newOrder: OrderData = {
      id: this.nextOrderId++,
      items: orderItems,
      customer: {
        name: orderData.customer.name,
        phone: orderData.customer.phone,
        address: orderData.customer.address,
      },
      totalAmount,
      createdAt: new Date().toISOString(),
    };

    this.orders.push(newOrder);

    return newOrder;
  }
}

class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";
  }
}

function parseNumericParam(paramValue: string, errorMessage: string): number {
  const numValue = parseInt(paramValue, 10);
  if (isNaN(numValue)) {
    throw new ApiError(errorMessage, 400);
  }
  return numValue;
}

function errorHandlerMiddleware(
  err: Error,
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.error("API Error:", err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return res.status(500).json({ error: "Внутренняя ошибка сервера" });
}

function createApiRouter(dataSource: ExampleDataSource) {
  const apiRouter = express.Router();

  apiRouter.get("/sections", (_req, res) => {
    const sections = dataSource.getSections();
    res.json(sections);
  });

  apiRouter.get("/sections/:id/products", (req, res) => {
    const sectionId = parseNumericParam(
      req.params.id,
      "Некорректный ID раздела"
    );
    const products = dataSource.getProductsBySection(sectionId);
    res.json(products);
  });

  apiRouter.get("/products/promo", (_req, res) => {
    const promoProducts = dataSource.getPromoProducts();
    res.json(promoProducts);
  });

  apiRouter.get("/products/:productId", (req, res) => {
    const productId = parseNumericParam(
      req.params.productId,
      "Некорректный ID продукта"
    );

    const product = dataSource.getProductById(productId);

    if (!product) {
      throw new ApiError("Продукт не найден", 400);
    }

    res.json(product);
  });

  apiRouter.post("/orders", express.json(), (req, res, next) => {
    const orderData: CreateOrderRequest = req.body;

    if (
      !orderData.items ||
      !Array.isArray(orderData.items) ||
      orderData.items.length === 0
    ) {
      throw new ApiError("Список товаров не может быть пустым", 400);
    }

    if (
      !orderData.customer ||
      !orderData.customer.name ||
      !orderData.customer.phone ||
      !orderData.customer.address
    ) {
      throw new ApiError(
        "Необходимо указать данные покупателя (ФИО, телефон, адрес)",
        400
      );
    }

    const newOrder = dataSource.createOrder(orderData);

    res.json({
      orderId: newOrder.id,
      totalAmount: newOrder.totalAmount,
      createdAt: newOrder.createdAt,
    });
  });

  apiRouter.use("*all", (_req, _res) => {
    throw new ApiError("Маршрут не найден", 404);
  });

  apiRouter.use(errorHandlerMiddleware);

  return apiRouter;
}

async function createServer() {
  const app = express();
  const dataSource = new ExampleDataSource("products.json");

  const vite = await createViteServer({
    server: { middlewareMode: true, hmr: true },
    appType: "custom",
  });

  app.use(vite.middlewares);

  app.use("/api", createApiRouter(dataSource));

  app.use("*all", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template = fs.readFileSync(
        path.resolve(__dirname, "index.html"),
        "utf-8"
      );

      template = await vite.transformIndexHtml(url, template);

      const { render } = await vite.ssrLoadModule("/src/entry-server.js");

      const rendered = await render(url);

      const html = template.replace(`<!--ssr-outlet-->`, () => rendered.html);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      if (e instanceof Error) {
        vite.ssrFixStacktrace(e);
      }
      next(e);
    }
  });

  app.listen(5173);
}

createServer();
