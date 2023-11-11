import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "../Typography/Typography";

export const RecentlyStudiedPage: FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <main>
      <Typography variant="headlineLarge">
        {t("Sidebar.recentlyStudied")}
      </Typography>
    </main>
  );
};
