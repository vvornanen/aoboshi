import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypes } from "../../preload/IpcApi";

export enum IpcApiErrorCode {
  NotFound = 404,
  InternalServerError = 500,
}

export type IpcApiError = {
  code: IpcApiErrorCode;
  message: string;
};

/**
 * Redux Toolkit Query base API for fetching data from Electron IPC API.
 *
 * The API is split by features, and each feature is located in their own
 * directory. All feature APIs inject their endpoints to this same API to
 * ensure that caching etc. works as expected.
 *
 * Each endpoint defines queryFn calling {@link IpcApi} directly, hence
 * using fakeBaseQuery here.
 *
 * @see https://redux-toolkit.js.org/rtk-query/usage/code-splitting
 */
export const ipcApi = createApi({
  baseQuery: fakeBaseQuery<IpcApiError>(),
  tagTypes,
  endpoints: () => ({}),
});
