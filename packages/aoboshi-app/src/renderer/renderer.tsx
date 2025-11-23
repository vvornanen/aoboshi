/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 */

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { options } from "~/i18n";
import { App } from "~app/App";
import "./styles.css";

// eslint-disable-next-line import/no-named-as-default-member
i18next.use(initReactI18next).init(options);

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
