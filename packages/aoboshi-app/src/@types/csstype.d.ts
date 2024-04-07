declare module "csstype" {
  interface Properties {
    // Extend vanilla-extract CSS properties with an Electron-specific rule
    // See: https://www.electronjs.org/docs/latest/tutorial/window-customization#set-custom-draggable-region
    // See: https://github.com/frenic/csstype/issues/71
    WebkitAppRegion?:
      | "drag"
      | "inherit"
      | "initial"
      | "no-drag"
      | "none"
      | "unset";
  }
}
