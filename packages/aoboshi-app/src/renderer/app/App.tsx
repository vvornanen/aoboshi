import { FunctionComponent } from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "../theme/ThemeProvider";
import { router } from "./routes";

export const App: FunctionComponent = () => (
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);
