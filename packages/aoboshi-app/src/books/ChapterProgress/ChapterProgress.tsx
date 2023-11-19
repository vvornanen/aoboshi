import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { StatisticsByChapter } from "../../statistics/useStatisticsByChapter";
import { chapterProgress } from "./ChapterProgress.css";

type ChapterProgressProps = ComponentPropsWithoutRef<"div"> & {
  data: StatisticsByChapter;
};

export const ChapterProgress: FunctionComponent<ChapterProgressProps> = ({
  data,
  className,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <div className={clsx(chapterProgress, className)} {...props}>
      {t("books.progressLabel", {
        reviewed: data.numberOfReviewedCharacters,
        total: data.totalNumberOfCharacters,
        percent: Math.round(data.reviewedRatio * 100),
      })}
    </div>
  );
};
