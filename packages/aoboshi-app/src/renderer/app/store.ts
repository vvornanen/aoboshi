import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ipcApi } from "./ipcApi";
import { settingsSlice } from "./settingsSlice";
import { listenerMiddleware } from "./listenerMiddleware";

export const store = configureStore({
  reducer: {
    [settingsSlice.reducerPath]: settingsSlice.reducer,
    [ipcApi.reducerPath]: ipcApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(ipcApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
