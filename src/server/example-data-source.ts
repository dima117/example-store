import { readFileSync } from "node:fs";
import type {
  CheckoutRequest,
  Product,
  ProductShortInfo,
  Section,
} from "../common/types";
import type { Order, OrderItem } from "./types";
import { ApiError } from "./utils";

/**
 * Класс для работы с данными приложения (разделы, товары, заказы)
 */
export class ExampleDataSource {
  private sections: Section[] = [];
  private products: Product[] = [];
  private orders: Order[] = [];
  private nextOrderId: number = 1;

  constructor(dataFilePath: string) {
    try {
      const data = JSON.parse(readFileSync(dataFilePath, "utf-8"));
      this.sections = data.sections;
      this.products = data.products;
    } catch (_error) {
      throw new Error(`Ошибка при загрузке данных из файла ${dataFilePath}:`);
    }
  }

  /**
   * Возвращает список всех разделов
   */
  getSections(): Section[] {
    return [...this.sections].sort((a, b) => a.sortOrder - b.sortOrder);
  }

  /**
   * Возвращает список товаров для указанного раздела
   */
  getProductsBySection(sectionId: number): ProductShortInfo[] {
    return this.products
      .filter((product) => product.section === sectionId)
      .map(({ id, name, price, section }) => ({ id, name, price, section }));
  }

  /**
   * Возвращает полную информацию о товаре по его идентификатору
   */
  getProductById(productId: number): Product | undefined {
    return this.products.find((product) => product.id === productId);
  }

  /**
   * Возвращает список промо-товаров для отображения на главной странице
   */
  getPromoProducts(count: number = 5): ProductShortInfo[] {
    return this.products
      .slice(0, count)
      .map(({ id, name, price, section }) => ({ id, name, price, section }));
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
