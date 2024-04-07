import { ComponentPropsWithoutRef, FunctionComponent, useId } from "react";
import { Volume } from "@vvornanen/aoboshi-core/books/Book";
import { ChapterSection } from "../ChapterSection/ChapterSection";
import { Typography } from "../../common/Typography/Typography";
import { Skeleton } from "../../common/Skeleton/Skeleton";
import { volumeHeading } from "./VolumeSection.css";

type VolumeSectionProps = ComponentPropsWithoutRef<"section"> & {
  volume?: Volume;
  loading?: boolean;
};

export const VolumeSection: FunctionComponent<VolumeSectionProps> = ({
  volume,
  loading,
}) => {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} aria-busy={loading}>
      <Typography
        id={headingId}
        variant="headlineMedium"
        component="h2"
        className={volumeHeading}
      >
        {!loading && volume?.title}
        {loading && <Skeleton length={8} />}
      </Typography>
      {!loading &&
        volume?.chapters.map((chapter) => {
          return <ChapterSection key={chapter.id} chapter={chapter} />;
        })}
      {loading && <ChapterSection loading />}
    </section>
  );
};
