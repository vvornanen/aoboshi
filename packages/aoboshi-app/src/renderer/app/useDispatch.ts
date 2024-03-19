import { useDispatch as useDispatchHook } from "react-redux";
import { AppDispatch } from "./store";

export const useDispatch: () => AppDispatch = useDispatchHook;
