import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Transition, motion, useReducedMotion } from "framer-motion";
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
import * as transitions from "~theme/transitions";
import { DateTime } from "~common/DateTime";

type ToolbarProps = Omit<ComponentPropsWithoutRef<"div">, "children">;

export const Toolbar: FunctionComponent<ToolbarProps> = ({
  className,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();
  const sidebarOpen = useSelector(selectSidebarOpen);

  const transition: Transition = shouldReduceMotion
    ? transitions.none
    : transitions.sidebar;

  return (
    <Container>
      <div
        className={clsx(styles.toolbar({ sidebarOpen }), className)}
        {...props}
      >
        <motion.div layout transition={transition} className={styles.search}>
          <SearchField className={styles.searchField} />
        </motion.div>
        <div className={styles.latestReview}>
          <motion.div layout="position" transition={transition}>
            <LatestReview />
          </motion.div>
        </div>
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
        <Popover.Trigger className={styles.latestReviewButton}>
          {t("Toolbar.latestReviewErrorButtonLabel")}
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            asChild
            side="bottom"
            align="end"
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
    <Popover.Root>
      {/* TODO: Use Button component in the trigger */}
      <Popover.Trigger className={styles.latestReviewButton}>
        <span className={styles.latestReviewLabel}>
          {t("Toolbar.latestReview")}
        </span>
        <RelativeTime date={latestReviewTimestamp} />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          asChild
          side="bottom"
          align="end"
          avoidCollisions
          collisionPadding={8}
        >
          <Card variant="raised">
            <DateTime value={latestReviewTimestamp} />
          </Card>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
