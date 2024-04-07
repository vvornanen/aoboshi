import { ipcMain } from "electron";
import { BookRepository } from "@vvornanen/aoboshi-core/books/BookRepository";
import { OnAfterInit } from "../../worker/ApplicationContext";
import { IpcEventType } from "../../preload/IpcApi";

/**
 * Handles inter-process events from the renderer process.
 * These handlers behave like backend endpoints, hence the name 'controller'.
 */
export class BookController implements OnAfterInit {
  constructor(private bookRepository: BookRepository) {}

  onAfterInit() {
    ipcMain.handle(IpcEventType.FindAllBooks, () => {
      return this.bookRepository.findAll();
    });

    ipcMain.handle(IpcEventType.FindBookById, (_, id: string) => {
      return this.bookRepository.findById(id);
    });
  }
}
