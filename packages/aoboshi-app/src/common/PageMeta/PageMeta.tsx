import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Portal } from "@mui/base";
import { visuallyHidden } from "../../styles.css";

type PageMetaProps = {
  title: string;
};

export const PageMeta: FunctionComponent<PageMetaProps> = ({ title }) => {
  const { t, i18n } = useTranslation();
  const [alertVisible, setAlertVisible] = useState(false);

  const documentTitle = t("pageTitle", { title });

  useEffect(() => {
    document.documentElement.setAttribute("lang", i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    document.title = documentTitle;
    setAlertVisible(true);

    const timeout = setTimeout(() => setAlertVisible(false), 5000);

    return () => clearTimeout(timeout);
  }, [documentTitle]);

  return (
    alertVisible && (
      <Portal>
        <div className={visuallyHidden} aria-live="polite">
          {documentTitle}
        </div>
      </Portal>
    )
  );
};
