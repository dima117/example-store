import faker from "faker";
import type { Product, Section } from "../src/types";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const SECTION_ID_OFFSET = 349;
const PRODUCT_ID_OFFSET = 12;
const SECTION_COUNT = 7;
const PRODUCT_COUNT = 146;

const getProduct = (id: number, section: number): Product => {
  return {
    id,
    section,
    name: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    color: faker.commerce.color(),
    material: faker.commerce.productMaterial(),
  };
};

const generateData = (count: number) => {
  const sections: Section[] = [];

  for (let i = 0; i < SECTION_COUNT; i++) {
    sections.push({
      id: i + SECTION_ID_OFFSET,
      name: faker.commerce.department(),
      sortOrder: i,
    });
  }

  const products: Product[] = [];

  for (let id = 0; id < count; id++) {
    const section = faker.random.arrayElement(sections);
    products.push(getProduct(id + PRODUCT_ID_OFFSET, section.id));
  }

  return { sections, products };
};

const filePath = join(process.cwd(), "products.json");
const data = generateData(PRODUCT_COUNT);

writeFileSync(filePath, JSON.stringify(data, null, 2));
