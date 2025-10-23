import express from "express";
import { readFileSync } from "node:fs";
import { createServer } from "vite";

export const createViteServer = async (templateFilePath: string) => {
  const { transformIndexHtml, ssrLoadModule, ssrFixStacktrace, middlewares } =
    await createServer({
      server: { middlewareMode: true, hmr: true },
      appType: "custom",
    });

  const indexHtml: express.Handler = async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template = readFileSync(templateFilePath, "utf-8");

      template = await transformIndexHtml(url, template);

      const { render } = await ssrLoadModule("/src/entry-server.js");

      const rendered = await render(url);

      const html = template.replace(`<!--ssr-outlet-->`, () => rendered.html);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      if (e instanceof Error) {
        ssrFixStacktrace(e);
      }
      next(e);
    }
  };

  return { middlewares, indexHtml };
};
