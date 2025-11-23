import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";

import { visuallyHidden } from "~common/visuallyHidden.css";

type PageMetaProps = {
  title: string;
};

export const PageMeta: FunctionComponent<PageMetaProps> = ({ title }) => {
  useDocumentLanguage();

  useEffect(() => {
    document.title = title;
  }, [title]);

  return <RouteAnnouncer title={title} />;
};

/** Updates document lang attribute when application language changes. */
const useDocumentLanguage = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.setAttribute("lang", i18n.language);
  }, [i18n.language]);
};

type RouteAnnouncerProps = {
  title: string;
};

/** Notifies screen readers with a new page title when the route changes. */
const RouteAnnouncer: FunctionComponent<RouteAnnouncerProps> = ({ title }) => {
  const [prevTitle, setPrevTitle] = useState<string | undefined>(undefined);
  const [alertVisible, setAlertVisible] = useState(false);

  if (title !== prevTitle) {
    setAlertVisible(true);
    setPrevTitle(title);
  }

  useEffect(() => {
    const timeout = setTimeout(() => setAlertVisible(false), 10000);
    return () => clearTimeout(timeout);
  }, [title]);

  return createPortal(
    <div aria-live="polite" className={visuallyHidden}>
      {alertVisible && title}
    </div>,
    document.body,
  );
};
