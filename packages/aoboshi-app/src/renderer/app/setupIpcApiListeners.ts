import { isAnyOf } from "@reduxjs/toolkit";
import { startListening } from "./listenerMiddleware";
import {
  selectSidebarOpen,
  setSidebarOpen,
  toggleSidebar,
} from "./settingsSlice";
import { AppDispatch } from "./store";
import { ipcApi } from "./ipcApi";

/** Connects Electron IPC events to Redux store */
export const setupIpcApiListeners = (dispatch: AppDispatch) => {
  if (!window.ipcApi) {
    console.warn("IpcApi not found, skipping setupIpcApiListeners");
    return;
  }

  startListening({
    matcher: isAnyOf(toggleSidebar, setSidebarOpen),
    effect: (_, { getState }) => {
      window.ipcApi.toggleSidebar(selectSidebarOpen(getState()));
    },
  });

  window.ipcApi.onToggleSidebar((open: boolean) =>
    dispatch(setSidebarOpen(open)),
  );

  window.ipcApi.onInvalidateTags((tags) =>
    dispatch(ipcApi.util.invalidateTags(tags)),
  );
};
