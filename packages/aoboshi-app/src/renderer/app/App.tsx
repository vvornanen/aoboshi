import { FunctionComponent } from "react";
import { RouterProvider } from "react-router/dom";
import { Provider } from "react-redux";
import { store } from "./store"; // Store must be loaded before routes
import { router } from "./routes";
import { ThemeProvider } from "~theme";

export const App: FunctionComponent = () => (
  <Provider store={store}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);
