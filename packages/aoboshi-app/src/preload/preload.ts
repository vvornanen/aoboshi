import { contextBridge, ipcRenderer } from "electron";
import { Book } from "@vvornanen/aoboshi-core/books/Book";
import { Character } from "@vvornanen/aoboshi-core/characters/Character";
import { IpcApi, IpcEventType, IPC_API_KEY } from "./IpcApi";

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// API exposed to the renderer process
const api: IpcApi = {
  onToggleSidebar: (callback) =>
    ipcRenderer.on(IpcEventType.ToggleSidebar, (_, open) => callback(open)),
  toggleSidebar: (open) => ipcRenderer.send(IpcEventType.ToggleSidebar, open),
  onNavigate: (callback) =>
    ipcRenderer.on(IpcEventType.Navigate, (_, to) => callback(to)),
  findBookById: (id: string): Promise<Book | null> =>
    ipcRenderer.invoke(IpcEventType.FindBookById, id),
  findAllBooks: (): Promise<Book[]> =>
    ipcRenderer.invoke(IpcEventType.FindAllBooks),
  findCharacterByLiteral: (literal: string): Promise<Character | null> =>
    ipcRenderer.invoke(IpcEventType.FindCharacterByLiteral, literal),
};

contextBridge.exposeInMainWorld(IPC_API_KEY, api);
