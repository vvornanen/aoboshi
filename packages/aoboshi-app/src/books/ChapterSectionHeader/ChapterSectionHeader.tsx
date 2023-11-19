import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { Typography } from "../../Typography/Typography";
import { CompletedBadge } from "../CompletedBadge/CompletedBadge";

type ChapterSectionHeaderProps = ComponentPropsWithoutRef<"div"> & {
  title: string;
  completed?: boolean;
};

export const ChapterSectionHeader: FunctionComponent<
  ChapterSectionHeaderProps
> = ({ id, title, completed = false, className, ...props }) => {
  return (
    <div>
      <CompletedBadge className={className} invisible={!completed} {...props}>
        <Typography id={id} variant="bodyLarge" component="h3">
          {title}
        </Typography>
      </CompletedBadge>
    </div>
  );
};
