import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useId,
  useMemo,
} from "react";
import { clsx } from "clsx";
import { Chapter } from "@vvornanen/aoboshi-core/books/Book";
import { CharactersCard } from "../../characters/CharactersCard/CharactersCard";
import { useStatisticsByCharacters } from "../../statistics/useStatisticsByCharacters";
import { useStatisticsByChapter } from "../../statistics/useStatisticsByChapter";
import { ChapterSectionHeader } from "../ChapterSectionHeader/ChapterSectionHeader";
import { ChapterProgress } from "../ChapterProgress/ChapterProgress";
import { chapterSection, progress, sectionHeader } from "./ChapterSection.css";

type ChapterSectionProps = Omit<
  ComponentPropsWithoutRef<"section">,
  "children"
> & {
  chapter: Chapter;
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
  className,
  ...props
}) => {
  const headingId = useId();
  const literals = getLiterals(chapter);

  const statisticsByChapter = useStatisticsByChapter(chapter.id);
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
      key={chapter.code}
      className={clsx(chapterSection, className)}
      {...props}
      aria-labelledby={headingId}
    >
      <ChapterSectionHeader
        id={headingId}
        title={chapter.title}
        completed={completed}
        className={sectionHeader}
      />
      {characters.length > 0 && (
        <>
          <ChapterProgress data={statisticsByChapter} className={progress} />
          <CharactersCard characters={characters} />
        </>
      )}
    </section>
  );
};
