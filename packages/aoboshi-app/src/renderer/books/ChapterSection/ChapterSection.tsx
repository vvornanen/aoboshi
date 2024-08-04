import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useId,
  useMemo,
} from "react";
import { clsx } from "clsx";
import { Chapter } from "@vvornanen/aoboshi-core/books";
import * as styles from "./ChapterSection.css";
import { CharactersCard } from "~characters/CharactersCard";
import { useStatisticsByChapter, useStatisticsByCharacters } from "~statistics";
import { ChapterSectionHeader } from "~books/ChapterSectionHeader";
import { ChapterProgress } from "~books/ChapterProgress";

type ChapterSectionProps = Omit<
  ComponentPropsWithoutRef<"section">,
  "children"
> & {
  chapter?: Chapter;
  loading?: boolean;
};

const getLiterals = (chapter: Chapter): string[] => {
  if (typeof chapter.characters === "string") {
    return [...chapter.characters];
  } else {
    return chapter.characters.map((character) => character.literal);
  }
};

export const ChapterSection: FunctionComponent<ChapterSectionProps> = ({
  chapter,
  loading = false,
  className,
  ...props
}) => {
  const headingId = useId();
  const literals = chapter ? getLiterals(chapter) : [];

  const statisticsByChapter = useStatisticsByChapter(chapter?.id || "");
  const statisticsByCharacters = useStatisticsByCharacters(literals);

  const characters = useMemo(
    () =>
      statisticsByCharacters.map((stats) => ({
        literal: stats.literal,
        seen: stats.numberOfReviews > 0,
        highlight: false, // TODO: Define highlight criteria
      })),
    [statisticsByCharacters],
  );

  const completed =
    Math.abs(1 - statisticsByChapter.reviewedRatio) < Number.EPSILON;

  return (
    <section
      className={clsx(styles.chapterSection, className)}
      {...props}
      aria-labelledby={headingId}
      aria-busy={loading}
    >
      <ChapterSectionHeader
        id={headingId}
        title={chapter?.title || ""}
        completed={completed}
        className={styles.sectionHeader}
        loading={loading}
      />
      {!loading && characters.length > 0 && (
        <>
          <ChapterProgress
            data={statisticsByChapter}
            className={styles.progress}
          />
          <CharactersCard characters={characters} />
        </>
      )}
      {loading && (
        <>
          <ChapterProgress
            loading
            data={statisticsByChapter}
            className={styles.progress}
          />
          <CharactersCard loading />
        </>
      )}
    </section>
  );
};
