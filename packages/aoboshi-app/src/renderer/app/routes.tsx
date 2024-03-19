import { createHashRouter } from "react-router-dom";
import { RecentlyStudiedPage } from "../recentlyStudied/RecentlyStudiedPage/RecentlyStudiedPage";
import { BookPage } from "../books/BookPage/BookPage";
import { SidebarLayout } from "./SidebarLayout/SidebarLayout";

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

window.ipcApi.onNavigate((to) => router.navigate(to));
