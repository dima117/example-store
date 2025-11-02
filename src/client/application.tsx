import { type FC } from "react";
import { Routes, Route } from "react-router";
import { Layout } from "./layout";
import { Home } from "./pages/home";
import { Catalog } from "./pages/catalog";
import { Product } from "./pages/product";
import { Cart } from "./pages/cart";
import { Contacts } from "./pages/contacts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

/** основной компонент приложения */
export const Application: FC = () => {
  return (
    <QueryClientProvider client={client}>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="catalog/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="contacts" element={<Contacts />} />
        </Routes>
      </Layout>
    </QueryClientProvider>
  );
};
