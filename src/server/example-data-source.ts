import { readFileSync } from "node:fs";
import type {
  CheckoutRequest,
  Product,
  ProductShortInfo,
} from "../common/types";
import type { Order, OrderItem } from "./types";
import { ApiError } from "./utils";

/**
 * Класс для работы с данными приложения (разделы, товары, заказы)
 */
export class ExampleDataSource {
  private products: Product[] = [];
  private orders: Order[] = [];
  private nextOrderId: number = 1;

  constructor(dataFilePath: string) {
    try {
      const data = JSON.parse(readFileSync(dataFilePath, "utf-8"));
      this.products = data.products;
    } catch (_error) {
      throw new Error(`Ошибка при загрузке данных из файла ${dataFilePath}:`);
    }
  }

  /**
   * Возвращает список товаров для указанного раздела
   */
  getProducts(): ProductShortInfo[] {
    return this.products.map(({ id, name, price }) => ({ id, name, price }));
  }

  /**
   * Возвращает полную информацию о товаре по его идентификатору
   */
  getProductById(productId: number): Product | undefined {
    return this.products.find((product) => product.id === productId);
  }

  /**
   * Создает новый заказ
   */
  checkout(orderData: CheckoutRequest): Order {
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

    const newOrder: Order = {
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
