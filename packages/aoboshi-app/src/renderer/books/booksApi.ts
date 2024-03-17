import { Book } from "@vvornanen/aoboshi-core/books/Book";
import { ipcApi } from "../app/ipcApi";

/**
 * Redux Toolkit Query API for fetching books from the database through
 * Electron IPC.
 */
const booksApi = ipcApi.injectEndpoints({
  endpoints: (build) => ({
    findAllBooks: build.query<Book[], void>({
      providesTags: (books) => [
        { type: "Book", id: "LIST" },
        ...(books || []).map((book) => ({
          type: "Book" as const,
          id: book.id,
        })),
      ],
      queryFn: async () => {
        try {
          return {
            data: await window.ipcApi.findAllBooks(),
          };
        } catch (error) {
          console.error(error);
          return {
            error: `Fetching all books failed: ${error}`,
          };
        }
      },
    }),
    findBookById: build.query<Book | null, string>({
      providesTags: (book) => (book ? [{ type: "Book", id: book.id }] : []),
      queryFn: async (id) => {
        try {
          return {
            data: await window.ipcApi.findBookById(id),
          };
        } catch (error) {
          console.error(error);
          return {
            error: `Fetching book ${id} failed: ${error}`,
          };
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useFindAllBooksQuery, useFindBookByIdQuery } = booksApi;
