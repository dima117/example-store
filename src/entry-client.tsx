import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Application } from "./Application.tsx";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root element was not found");
}

hydrateRoot(
  root,
  <StrictMode>
    <Application />
  </StrictMode>
);
