import { createHashRouter } from "react-router-dom";
import { SidebarLayout } from "./SidebarLayout/SidebarLayout";
import { RecentlyStudiedPage } from "./recentlyStudied/RecentlyStudiedPage/RecentlyStudiedPage";
import { BookPage } from "./books/BookPage/BookPage";

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
