import { createHashRouter } from "react-router-dom";
import { BookPage } from "~books/BookPage";
import { SidebarLayout } from "~app/SidebarLayout";
import { RecentlyStudiedPage } from "~recentlyStudied/RecentlyStudiedPage";

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
