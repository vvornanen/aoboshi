import { createListenerMiddleware } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";

export const listenerMiddleware = createListenerMiddleware();

export const startListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>();
