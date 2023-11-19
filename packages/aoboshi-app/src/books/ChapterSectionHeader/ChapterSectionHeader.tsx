import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { clsx } from "clsx";
import { Typography } from "../../Typography/Typography";
import { CompletedBadge } from "../CompletedBadge/CompletedBadge";
import { chapterSectionHeader } from "./ChapterSectionHeader.css";

type ChapterSectionHeaderProps = ComponentPropsWithoutRef<"div"> & {
  title: string;
  completed?: boolean;
};

export const ChapterSectionHeader: FunctionComponent<
  ChapterSectionHeaderProps
> = ({ id, title, completed = false, className, ...props }) => {
  return (
    <div>
      <CompletedBadge
        className={clsx(chapterSectionHeader, className)}
        invisible={!completed}
        {...props}
      >
        <Typography id={id} variant="bodyLarge" component="h3">
          {title}
        </Typography>
      </CompletedBadge>
    </div>
  );
};
