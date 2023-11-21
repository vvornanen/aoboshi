import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Portal } from "@mui/base";
import { visuallyHidden } from "../../styles.css";

type PageMetaProps = {
  title: string;
};

export const PageMeta: FunctionComponent<PageMetaProps> = ({ title }) => {
  const { i18n } = useTranslation();
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("lang", i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    document.title = title;
    setAlertVisible(true);

    const timeout = setTimeout(() => setAlertVisible(false), 5000);

    return () => clearTimeout(timeout);
  }, [title]);

  return (
    alertVisible && (
      <Portal>
        <div className={visuallyHidden} aria-live="polite">
          {title}
        </div>
      </Portal>
    )
  );
};
