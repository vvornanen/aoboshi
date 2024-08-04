import { FunctionComponent, useId } from "react";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { content, dragRegion, layout, toggleButton } from "./SidebarLayout.css";
import { Sidebar } from "~app/Sidebar";
import { noDrag, windowControlsHeight } from "~/renderer/styles.css";
import { SidebarIcon } from "~icons";
import { IconButton } from "~common/IconButton";
import { Toolbar } from "~app/Toolbar";
import {
  selectSidebarOpen,
  selectSidebarWidth,
  toggleSidebar,
} from "~app/settingsSlice";
import { useDispatch } from "~app/useDispatch";
import { useSelector } from "~app/useSelector";

export const SidebarLayout: FunctionComponent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const sidebarOpen = useSelector(selectSidebarOpen);
  const sidebarWidth = useSelector(selectSidebarWidth);
  const sidebarId = useId();

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className={layout}>
      <div className={dragRegion} />
      <IconButton
        className={clsx(toggleButton, noDrag)}
        onClick={handleToggleSidebar}
        title={t("Layout.toggleSidebar")}
        aria-controls={sidebarId}
        aria-expanded={sidebarOpen}
      >
        <SidebarIcon />
      </IconButton>
      <Sidebar id={sidebarId} width={sidebarWidth} open={sidebarOpen} />
      <div
        className={content}
        style={{ marginLeft: sidebarOpen ? 0 : -sidebarWidth }}
      >
        <Toolbar>{/* Toolbar content */}</Toolbar>
        <div
          style={{
            maxHeight: `calc(100vh - ${windowControlsHeight})`,
            overflowY: "auto",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};
