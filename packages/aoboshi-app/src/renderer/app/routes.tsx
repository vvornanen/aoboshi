import { createHashRouter } from "react-router";
import { BookPage, BookPageLoader } from "~books/BookPage";
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
        loader: ({ params }) => {
          if (!params.bookId) {
            throw new Error("Missing book id");
          }

          return { bookId: params.bookId } satisfies ReturnType<BookPageLoader>;
        },
        element: <BookPage />,
      },
    ],
  },
]);

window.ipcApi.onNavigate((to) => router.navigate(to));
