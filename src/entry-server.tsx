import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { Application } from "./Application";

/**
 * @param {string} _url
 */
export function render(_url: string) {
  const html = renderToString(
    <StrictMode>
      <Application />
    </StrictMode>
  );

  return { html };
}
