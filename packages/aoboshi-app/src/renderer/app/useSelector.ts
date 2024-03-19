import {
  TypedUseSelectorHook,
  useSelector as useSelectorHook,
} from "react-redux";
import { RootState } from "./store";

export const useSelector: TypedUseSelectorHook<RootState> = useSelectorHook;
