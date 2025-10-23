import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "./src/server/create-server";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function startServer(port: number) {
  const app = await createServer({
    templateFilePath: resolve(__dirname, "index.html"),
    dataFilePath: resolve(__dirname, "products.json"),
  });

  app.listen(port);
  console.log(`http://localhost:${port}`);
}

void startServer(5173);
