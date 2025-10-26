import { type FC } from "react";
import { Routes, Route } from "react-router";
import { Layout } from "./layout";
import { Home } from "./pages/home";
import { Catalog } from "./pages/catalog";
import { About } from "./pages/about";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "bootstrap/dist/css/bootstrap.min.css";

const client = new QueryClient();

export const Application: FC = () => {
  return (
    <QueryClientProvider client={client}>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="about" element={<About />} />
        </Routes>
      </Layout>
    </QueryClientProvider>
  );
};
