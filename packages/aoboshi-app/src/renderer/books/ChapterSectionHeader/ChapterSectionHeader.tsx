import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { Typography } from "~common/Typography";
import { CompletedBadge } from "~books/CompletedBadge";
import { Skeleton } from "~common/Skeleton";

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
        aria-hidden={loading || undefined}
      >
        {!loading && title}
        {loading && <Skeleton length={16} />}
      </Typography>
    </CompletedBadge>
  );
};
