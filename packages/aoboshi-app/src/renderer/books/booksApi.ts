import { Book } from "@vvornanen/aoboshi-core/books/Book";
import { ipcApi, IpcApiErrorCode } from "../app/ipcApi";

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
            error: {
              code: IpcApiErrorCode.InternalServerError,
              message: `Fetching all books failed: ${error}`,
            },
          };
        }
      },
    }),
    findBookById: build.query<Book, string>({
      providesTags: (book) => (book ? [{ type: "Book", id: book.id }] : []),
      queryFn: async (id) => {
        try {
          const data = await window.ipcApi.findBookById(id);

          if (!data) {
            return {
              error: {
                code: IpcApiErrorCode.NotFound,
                message: `Book '${id}' not found`,
              },
            };
          }

          return { data };
        } catch (error) {
          console.error(error);
          return {
            error: {
              code: IpcApiErrorCode.InternalServerError,
              message: `Fetching book '${id}' failed: ${error}`,
            },
          };
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useFindAllBooksQuery, useFindBookByIdQuery } = booksApi;
