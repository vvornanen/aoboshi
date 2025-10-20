import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import * as Popover from "@radix-ui/react-popover";
import * as styles from "./Toolbar.css";
import { RelativeTime } from "~common/RelativeTime";
import { Container } from "~common/Container";
import { selectSidebarOpen } from "~app/settingsSlice";
import { useSelector } from "~app/useSelector";
import { useLatestReviewTimestamp } from "~statistics/useLatestReviewTimestamp";
import { Skeleton } from "~common/Skeleton";
import { maru } from "~common";
import { SearchField } from "~search/SearchField";
import { Card } from "~common/Card";
import { Typography } from "~common/Typography";

// TODO: Move to theme
const transition = { type: "spring", stiffness: 300, damping: 30 };

type ToolbarProps = Omit<ComponentPropsWithoutRef<"div">, "children">;

export const Toolbar: FunctionComponent<ToolbarProps> = ({
  className,
  ...props
}) => {
  const sidebarOpen = useSelector(selectSidebarOpen);

  return (
    <Container>
      <div
        className={clsx(styles.toolbar({ sidebarOpen }), className)}
        {...props}
      >
        <div className={styles.search}>
          <motion.div layout="position" transition={transition}>
            <SearchField />
          </motion.div>
        </div>
        <motion.div
          layout="position"
          className={styles.latestReview}
          transition={transition}
        >
          <LatestReview />
        </motion.div>
      </div>
    </Container>
  );
};

const LatestReview = () => {
  const { t } = useTranslation();
  const { latestReviewTimestamp, isLoading, error } =
    useLatestReviewTimestamp();

  if (isLoading) {
    return (
      <Skeleton>
        {t("Toolbar.latestReview")}
        {maru(4)}
      </Skeleton>
    );
  } else if (error) {
    return (
      <Popover.Root>
        {/* TODO: Use Button component in the trigger */}
        <Popover.Trigger className={styles.latestReviewErrorButton}>
          {t("Toolbar.latestReviewErrorButtonLabel")}
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            asChild
            side="bottom"
            align="start"
            avoidCollisions
            collisionPadding={8}
          >
            <Card variant="raised">
              {/* TODO: Error component */}
              <Typography component="p">
                {t("Toolbar.latestReviewErrorPopoverText")}
              </Typography>
              <Typography component="p">{error.message}</Typography>
            </Card>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  } else if (!latestReviewTimestamp) {
    return null; // Anki integration not enabled
  }

  return (
    <dl>
      <dt className={styles.latestReviewLabel}>{t("Toolbar.latestReview")}</dt>
      <dd className={styles.latestReviewTime}>
        <RelativeTime date={latestReviewTimestamp} />
      </dd>
    </dl>
  );
};
