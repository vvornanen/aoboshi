import { FunctionComponent, useEffect, useId, useState } from "react";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import { noDrag, windowControlsHeight } from "../../styles.css";
import { SidebarIcon } from "../../icons/SidebarIcon";
import { IconButton } from "../../common/IconButton/IconButton";
import { Toolbar } from "../Toolbar/Toolbar";
import { content, dragRegion, layout, toggleButton } from "./SidebarLayout.css";

export const SidebarLayout: FunctionComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarId = useId();
  const sidebarWidth = 200;

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => {
      const open = !prevState;
      window.ipcApi.toggleSidebar(open);
      return open;
    });
  };

  useEffect(() => {
    window.ipcApi.onToggleSidebar((open: boolean) => setSidebarOpen(open));
  }, []);

  useEffect(() => {
    window.ipcApi.onNavigate((to) => navigate(to));
  }, [navigate]);

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
        <Toolbar sidebarOpen={sidebarOpen}>{/* Toolbar content */}</Toolbar>
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
