import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "./src/server/create-server";

const __dirname = dirname(fileURLToPath(import.meta.url));

const port: number = Number(process.env.EXAMPLE_PORT) || 5173;

async function startServer(port: number) {
  const app = await createServer({
    templateFilePath: resolve(__dirname, "index.html"),
    dataFilePath: resolve(__dirname, "products.json"),
  });

  app.listen(port);
  console.log(`http://localhost:${port}`);
}

void startServer(port);
