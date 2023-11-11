import { createHashRouter } from "react-router-dom";
import { SidebarLayout } from "./SidebarLayout/SidebarLayout";
import { RecentlyStudiedPage } from "./pages/RecentlyStudiedPage";
import { BookPage } from "./pages/BookPage";

export const router = createHashRouter([
  {
    path: "/",
    element: <SidebarLayout />,
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
