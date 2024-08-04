import { FunctionComponent, useId } from "react";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import * as styles from "./SidebarLayout.css";
import { Sidebar } from "~app/Sidebar";
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
import { noDrag } from "~common/window.css";
import * as theme from "~theme/theme.css";

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
    <div className={styles.layout}>
      <div className={styles.dragRegion} />
      <IconButton
        className={clsx(styles.toggleButton, noDrag)}
        onClick={handleToggleSidebar}
        title={t("Layout.toggleSidebar")}
        aria-controls={sidebarId}
        aria-expanded={sidebarOpen}
      >
        <SidebarIcon />
      </IconButton>
      <Sidebar id={sidebarId} width={sidebarWidth} open={sidebarOpen} />
      <div
        className={styles.content}
        style={{ marginLeft: sidebarOpen ? 0 : -sidebarWidth }}
      >
        <Toolbar>{/* Toolbar content */}</Toolbar>
        <div
          style={{
            maxHeight: `calc(100vh - ${theme.vars.windowControls.height})`,
            overflowY: "auto",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};
