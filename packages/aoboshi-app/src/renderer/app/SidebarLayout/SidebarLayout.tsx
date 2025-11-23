import { FunctionComponent, useId, useState } from "react";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { Transition, motion, useReducedMotion } from "motion/react";
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
import * as transitions from "~theme/transitions";

export const SidebarLayout: FunctionComponent = () => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const dispatch = useDispatch();
  const sidebarOpen = useSelector(selectSidebarOpen);
  const sidebarWidth = useSelector(selectSidebarWidth);
  const sidebarId = useId();
  const [sidebarVisible, setSidebarVisible] = useState(sidebarOpen);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleAnimationStart = () => {
    if (sidebarOpen) {
      setSidebarVisible(true);
    }
  };

  const handleAnimationComplete = () => {
    if (!sidebarOpen) {
      setSidebarVisible(false);
    }
  };

  const transition: Transition = shouldReduceMotion
    ? transitions.none
    : transitions.sidebar;

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
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        {sidebarVisible && (
          <Sidebar id={sidebarId} className={styles.sidebar} />
        )}
        <div className={styles.toolbar}>
          <Toolbar />
        </div>
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
