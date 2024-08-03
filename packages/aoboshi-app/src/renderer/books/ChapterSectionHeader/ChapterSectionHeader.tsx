import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { Typography } from "../../common/Typography/Typography";
import { CompletedBadge } from "../CompletedBadge/CompletedBadge";
import { Skeleton } from "../../common/Skeleton/Skeleton";

type ChapterSectionHeaderProps = ComponentPropsWithoutRef<"div"> & {
  title?: string;
  completed?: boolean;
  loading?: boolean;
};

export const ChapterSectionHeader: FunctionComponent<
  ChapterSectionHeaderProps
> = ({
  id,
  title,
  completed = false,
  loading = false,
  className,
  ...props
}) => {
  return (
    <CompletedBadge
      className={className}
      show={completed}
      seed={title}
      {...props}
    >
      <Typography
        id={id}
        variant="bodyLarge"
        component="h3"
        aria-busy={loading}
      >
        {!loading && title}
        {loading && <Skeleton length={16} />}
      </Typography>
    </CompletedBadge>
  );
};
