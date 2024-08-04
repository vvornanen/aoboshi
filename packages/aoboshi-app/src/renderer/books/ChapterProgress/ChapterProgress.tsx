import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import {
  chapterProgress,
  progressBar,
  reviewedBar,
  unreviewedBar,
  unseenBar,
} from "./ChapterProgress.css";
import { Skeleton } from "~common/Skeleton";
import { StatisticsByChapter } from "~statistics";

type ChapterProgressProps = ComponentPropsWithoutRef<"div"> & {
  data: StatisticsByChapter;
  loading?: boolean;
};

export const ChapterProgress: FunctionComponent<ChapterProgressProps> = ({
  data,
  className,
  loading,
  ...props
}) => {
  const { t } = useTranslation();

  const barWidth = 300;
  const barHeight = 8;
  const completedWidth = data.totalNumberOfCharacters
    ? (data.numberOfReviewedCharacters / data.totalNumberOfCharacters) *
      barWidth
    : 0;
  const unreviewedWidth = data.totalNumberOfCharacters
    ? (data.numberOfUnreviewedCharacters / data.totalNumberOfCharacters) *
      barWidth
    : 0;
  const unseenWidth = barWidth - completedWidth - unreviewedWidth;

  return (
    <div
      aria-busy={loading}
      className={clsx(chapterProgress, className)}
      {...props}
    >
      {!loading && (
        <>
          <svg
            width={barWidth}
            height={barHeight}
            viewBox={`0 0 ${barWidth} ${barHeight}`}
            className={progressBar}
          >
            <rect
              x={0}
              y={0}
              height={barHeight}
              width={completedWidth}
              fill="currentColor"
              className={reviewedBar}
            />
            <rect
              x={completedWidth}
              y={0}
              height={barHeight}
              width={unreviewedWidth}
              fill="currentColor"
              className={unreviewedBar}
            />
            <rect
              x={completedWidth + unreviewedWidth}
              y={0}
              height={barHeight}
              width={unseenWidth}
              fill="currentColor"
              className={unseenBar}
            />
          </svg>
          {t("books.progressLabel", {
            reviewed: data.numberOfReviewedCharacters,
            total: data.totalNumberOfCharacters,
            percent: Math.round(data.reviewedRatio * 100),
          })}
        </>
      )}
      {loading && (
        <>
          <Skeleton
            variant="roundedSmall"
            style={{ width: barWidth, height: barHeight }}
          />
          <Skeleton>
            {t("books.progressLabel", {
              reviewed: 10,
              total: 10,
              percent: 50,
            })}
          </Skeleton>
        </>
      )}
    </div>
  );
};
