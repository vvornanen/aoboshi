import { IpcApi, IPC_API_KEY } from "../preload/IpcApi";

declare global {
  interface Window {
    /** Electron IPC API for exchanging messages with the main process. */
    [IPC_API_KEY]: IpcApi;
  }
}
