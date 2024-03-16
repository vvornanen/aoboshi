import { ReactNode } from "react";
import { makeDecorator } from "@storybook/preview-api";
import { Provider } from "react-redux";
import { store } from "../renderer/app/store";
import { ipcApi } from "../renderer/app/ipcApi";

/** Storybook decorator for wrapping stories with Redux store provider */
export const withStoreProvider = makeDecorator({
  name: "withStoreProvider",
  parameterName: "store",
  wrapper: (getStory, context) => {
    store.dispatch(ipcApi.util.resetApiState()); // Clear query cache for each story
    return <Provider store={store}>{getStory(context) as ReactNode}</Provider>;
  },
});
