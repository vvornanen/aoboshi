import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import { RecentlyStudiedPage } from "./pages/RecentlyStudiedPage";
import { BookPage } from "./pages/BookPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <RecentlyStudiedPage />,
      },
      {
        path: "books/:bookId",
        element: <BookPage />,
      },
    ],
  },
]);
