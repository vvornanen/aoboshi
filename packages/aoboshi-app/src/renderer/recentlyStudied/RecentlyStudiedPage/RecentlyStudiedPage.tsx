import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "~common/Typography";
import { PageMeta } from "~common/PageMeta";
import { Container } from "~common/Container";

export const RecentlyStudiedPage: FunctionComponent = () => {
  const { t } = useTranslation();

  const title = t("Sidebar.recentlyStudied");

  return (
    <main>
      <PageMeta title={title} />
      <Container style={{ paddingTop: 16, paddingBottom: 48 }}>
        <Typography variant="headlineLarge" component="h1">
          {title}
        </Typography>
      </Container>
    </main>
  );
};
