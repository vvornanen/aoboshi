import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useId,
  useMemo,
} from "react";
import { CharactersCard } from "../../CharactersCard/CharactersCard";
import { Chapter } from "../Book";
import { useStatisticsByCharacters } from "../../statistics/useStatisticsByCharacters";
import { useStatisticsByChapter } from "../../statistics/useStatisticsByChapter";
import { ChapterSectionHeader } from "../ChapterSectionHeader/ChapterSectionHeader";
import { ChapterProgress } from "../ChapterProgress/ChapterProgress";

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
    <section key={chapter.code} {...props} aria-labelledby={headingId}>
      <ChapterSectionHeader
        id={headingId}
        title={chapter.title}
        completed={completed}
      />
      {characters.length > 0 && (
        <>
          <ChapterProgress data={statisticsByChapter} />
          <CharactersCard characters={characters} />
        </>
      )}
    </section>
  );
};
