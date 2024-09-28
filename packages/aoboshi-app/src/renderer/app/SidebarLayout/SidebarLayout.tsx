import { FunctionComponent, useId } from "react";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { Transition, motion, useReducedMotion } from "framer-motion";
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

export const SidebarLayout: FunctionComponent = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const dispatch = useDispatch();
  const sidebarOpen = useSelector(selectSidebarOpen);
  const sidebarWidth = useSelector(selectSidebarWidth);
  const sidebarId = useId();

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const transition: Transition = shouldReduceMotion
    ? { type: false }
    : { type: "spring", stiffness: 300, damping: 30 };

  return (
    <div className={styles.sidebarLayout}>
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
      <motion.div
        className={styles.sidebarContainer({ open: sidebarOpen })}
        style={assignInlineVars({ [styles.sidebarWidth]: `${sidebarWidth}px` })}
        transition={transition}
        animate={{ x: sidebarOpen ? 0 : -sidebarWidth }}
      >
        <Sidebar id={sidebarId} className={styles.sidebar} />
        <motion.div layout transition={transition} className={styles.toolbar}>
          <Toolbar>{/* Toolbar content */}</Toolbar>
        </motion.div>
        <motion.div
          layout="position"
          transition={transition}
          className={styles.main}
        >
          <Outlet />
        </motion.div>
      </motion.div>
    </div>
  );
};
