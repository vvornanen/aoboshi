import { ReactNode } from "react";
import { makeDecorator } from "storybook/preview-api";
import { Provider } from "react-redux";
import { mockIpcApi } from "./mockIpcApi";
import { ipcApi } from "~app/ipcApi";

/**
 * Loads the Redux store depending on IpcApi provided by the Electron preload.
 * In Storybook, IpcApi must be mocked before the store is initialized.
 * Therefore, this loader uses dynamic import.
 */
export const storeLoader = async () => {
  mockIpcApi();
  return { store: (await import("~app/store")).store };
};

/** Storybook decorator for wrapping stories with Redux store provider */
export const withStoreProvider = makeDecorator({
  name: "withStoreProvider",
  parameterName: "store",
  wrapper: (getStory, context) => {
    const store = context.loaded.store;

    if (!store) {
      throw new Error(
        "Use storeLoader to load Redux store before using withStoreProvider decorator",
      );
    }
    store.dispatch(ipcApi.util.resetApiState()); // Clear query cache for each story
    return <Provider store={store}>{getStory(context) as ReactNode}</Provider>;
  },
});
