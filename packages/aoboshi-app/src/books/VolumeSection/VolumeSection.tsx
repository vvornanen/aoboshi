import { ComponentPropsWithoutRef, FunctionComponent, useId } from "react";
import { Volume } from "../Book";
import { ChapterSection } from "../ChapterSection/ChapterSection";
import { Typography } from "../../Typography/Typography";
import { volumeHeading } from "./VolumeSection.css";

type VolumeSectionProps = ComponentPropsWithoutRef<"section"> & {
  volume: Volume;
};

export const VolumeSection: FunctionComponent<VolumeSectionProps> = ({
  volume,
}) => {
  const headingId = useId();

  return (
    <section key={volume.title} aria-labelledby={headingId}>
      <Typography
        id={headingId}
        variant="headlineMedium"
        component="h2"
        className={volumeHeading}
      >
        {volume.title}
      </Typography>
      {volume.chapters.map((chapter) => {
        return <ChapterSection key={chapter.id} chapter={chapter} />;
      })}
    </section>
  );
};
