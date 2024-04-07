import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Settings = {
  sidebarOpen: boolean;
  sidebarWidth: number;
};

const initialState: Settings = {
  sidebarOpen: true,
  sidebarWidth: 200,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
  selectors: {
    selectSidebarOpen: (state) => state.sidebarOpen,
    selectSidebarWidth: (state) => state.sidebarWidth,
  },
});

export const { setSidebarOpen, toggleSidebar } = settingsSlice.actions;
export const { selectSidebarOpen, selectSidebarWidth } =
  settingsSlice.selectors;
