import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

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
  baseQuery: fakeBaseQuery<string>(),
  tagTypes: ["Book", "Character"],
  endpoints: () => ({}),
});
