import { Book } from "./Book";

/** Persists book in a repository (e.g. SQLite database) */
export interface BookRepository {
  /**
   * Saves the given book to the repository.
   *
   * Creates a new book or updates an existing book.
   *
   * @param book
   */
  save(book: Book): void;

  /**
   * Finds a book by id.
   *
   * @param id
   * @return null if book was not found
   */
  findById(id: string): Book | null;

  /**
   * Returns all books in the repository.
   */
  findAll(): Book[];

  /**
   * Returns number of books in the repository.
   */
  count(): number;

  /**
   * Deletes the given book from the repository.
   *
   * @param id book id
   */
  deleteById(id: string): void;

  /**
   * Deletes the given book from the repository.
   *
   * @param book book object
   */
  delete(book: Book): void;
}
