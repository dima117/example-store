import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { Application } from "./client/application";
import { BrowserRouter } from "react-router";
import { initStore } from "@/store";

import "bootstrap/dist/css/bootstrap.min.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root element was not found");
}

const store = initStore();

hydrateRoot(
  root,
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Application />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
