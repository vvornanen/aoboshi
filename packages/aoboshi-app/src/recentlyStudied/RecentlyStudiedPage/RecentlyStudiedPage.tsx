import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "../../Typography/Typography";
import { PageMeta } from "../../PageMeta/PageMeta";

export const RecentlyStudiedPage: FunctionComponent = () => {
  const { t } = useTranslation();

  const title = t("Sidebar.recentlyStudied");

  return (
    <main>
      <PageMeta title={title} />
      <Typography variant="headlineLarge" component="h1">
        {title}
      </Typography>
    </main>
  );
};
