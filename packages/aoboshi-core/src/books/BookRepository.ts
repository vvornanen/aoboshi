import { Book } from ".";
import { Repository } from "~";

/** Persists book in a repository (e.g. SQLite database) */
export interface BookRepository extends Repository<Book, string> {}
