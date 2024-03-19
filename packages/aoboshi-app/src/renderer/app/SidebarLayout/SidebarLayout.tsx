import { FunctionComponent, useId } from "react";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import { noDrag, windowControlsHeight } from "../../styles.css";
import { SidebarIcon } from "../../icons/SidebarIcon";
import { IconButton } from "../../common/IconButton/IconButton";
import { Toolbar } from "../Toolbar/Toolbar";
import { useSelector } from "../useSelector";
import { useDispatch } from "../useDispatch";
import {
  selectSidebarOpen,
  selectSidebarWidth,
  toggleSidebar,
} from "../settingsSlice";
import { content, dragRegion, layout, toggleButton } from "./SidebarLayout.css";

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
