import { FunctionComponent } from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "../theme/ThemeProvider";
import { router } from "./routes";
import { store } from "./store";

export const App: FunctionComponent = () => (
  <Provider store={store}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);
