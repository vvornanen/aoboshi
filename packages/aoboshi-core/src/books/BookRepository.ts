import { Repository } from "../Repository";
import { Book } from "./Book";

/** Persists book in a repository (e.g. SQLite database) */
export interface BookRepository extends Repository<Book, string> {}
