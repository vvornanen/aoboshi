import { contextBridge, ipcRenderer } from "electron";
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
};

contextBridge.exposeInMainWorld(IPC_API_KEY, api);
