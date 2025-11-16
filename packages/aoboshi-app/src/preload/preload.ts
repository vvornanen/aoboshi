import { contextBridge, ipcRenderer } from "electron";
import { Book } from "@vvornanen/aoboshi-core/books";
import { Character } from "@vvornanen/aoboshi-core/characters";
import { StatisticsIncrement } from "@vvornanen/aoboshi-core/statistics";
import { IPC_API_KEY, IpcApi, IpcEventType } from "~/preload";

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// API exposed to the renderer process
const api: IpcApi = {
  onToggleSidebar: (callback) =>
    ipcRenderer.on(IpcEventType.ToggleSidebar, (_, open) => callback(open)),
  toggleSidebar: (open) => ipcRenderer.send(IpcEventType.ToggleSidebar, open),
  onNavigate: (callback) =>
    ipcRenderer.on(IpcEventType.Navigate, (_, to) => callback(to)),
  onInvalidateTags: (callback) =>
    ipcRenderer.on(IpcEventType.InvalidateTags, (_, tags) => callback(tags)),
  onSearch: (callback) => ipcRenderer.on(IpcEventType.Search, () => callback()),
  findBookById: (id: string): Promise<Book | null> =>
    ipcRenderer.invoke(IpcEventType.FindBookById, id),
  findAllBooks: (): Promise<Book[]> =>
    ipcRenderer.invoke(IpcEventType.FindAllBooks),
  findCharacterByLiteral: (literal: string): Promise<Character | null> =>
    ipcRenderer.invoke(IpcEventType.FindCharacterByLiteral, literal),
  findLatestStatisticsIncrement: (): Promise<StatisticsIncrement | null> =>
    ipcRenderer.invoke(IpcEventType.FindLatestStatisticsIncrement),
};

contextBridge.exposeInMainWorld(IPC_API_KEY, api);
