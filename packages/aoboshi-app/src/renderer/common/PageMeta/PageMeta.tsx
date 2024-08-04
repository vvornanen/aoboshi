import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";
import { visuallyHidden } from "~/renderer/styles.css";

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
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    setAlertVisible(true);

    const timeout = setTimeout(() => setAlertVisible(false), 5000);

    return () => clearTimeout(timeout);
  }, [title]);

  return (
    <>
      {alertVisible &&
        createPortal(
          <div
            data-route-announcer=""
            className={visuallyHidden}
            aria-live="polite"
          >
            {title}
          </div>,
          document.body,
        )}
    </>
  );
};
