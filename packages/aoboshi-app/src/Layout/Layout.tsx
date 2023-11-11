import { FunctionComponent, useId, useState } from "react";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import { noDrag } from "../App.css";
import { SidebarIcon } from "../icons/SidebarIcon";
import { IconButton } from "../IconButton/IconButton";
import { windowControlsWidth } from "../styles.css";
import {
  content,
  dragRegion,
  layout,
  toggleButton,
  toolbar,
} from "./Layout.css";

export const Layout: FunctionComponent = () => {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarId = useId();
  const sidebarWidth = 200;

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className={layout}>
      <div className={dragRegion} />
      <IconButton
        className={clsx(toggleButton, noDrag)}
        onClick={toggleSidebar}
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
        <div
          className={toolbar}
          style={{
            marginLeft: sidebarOpen ? 0 : `calc(${windowControlsWidth} + 28px)`,
          }}
        >
          {/* Toolbar content */}
        </div>
        <Outlet />
      </div>
    </div>
  );
};
