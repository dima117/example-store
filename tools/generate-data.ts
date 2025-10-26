import faker from "faker";
import type { Product } from "../src/common/types";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const PRODUCT_ID_OFFSET = 13;
const PRODUCT_COUNT = 42;

const getProduct = (id: number): Product => {
  return {
    id,
    name: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    color: faker.commerce.color(),
    material: faker.commerce.productMaterial(),
  };
};

const generateData = (count: number) => {
  const products: Product[] = [];

  for (let id = 0; id < count; id++) {
    products.push(getProduct(id + PRODUCT_ID_OFFSET));
  }

  return { products };
};

const filePath = join(process.cwd(), "products.json");
const data = generateData(PRODUCT_COUNT);

writeFileSync(filePath, JSON.stringify(data, null, 2));
