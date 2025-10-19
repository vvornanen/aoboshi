import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import * as styles from "./Toolbar.css";
import { RelativeTime } from "~common/RelativeTime";
import { Container } from "~common/Container";
import { selectSidebarOpen } from "~app/settingsSlice";
import { useSelector } from "~app/useSelector";
import { useLatestReviewTimestamp } from "~statistics/useLatestReviewTimestamp";
import { Skeleton } from "~common/Skeleton";
import { maru } from "~common";
import { SearchField } from "~search/SearchField";

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
    return error.message;
  } else if (!latestReviewTimestamp) {
    return null;
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
