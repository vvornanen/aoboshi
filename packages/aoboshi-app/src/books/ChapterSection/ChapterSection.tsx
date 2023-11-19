import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useId,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "../../Typography/Typography";
import { CharactersCard } from "../../CharactersCard/CharactersCard";
import { Chapter } from "../Book";
import { useStatisticsByCharacters } from "../../statistics/useStatisticsByCharacters";
import { useStatisticsByChapter } from "../../statistics/useStatisticsByChapter";
import { CompletedBadge } from "../CompletedBadge/CompletedBadge";
import { progress } from "./ChapterSection.css";

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
  const { t } = useTranslation();
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
      <CompletedBadge
        style={{ marginTop: 24, marginBottom: 16 }}
        invisible={!completed}
      >
        <Typography id={headingId} variant="bodyLarge" component="h3">
          {chapter.title}
        </Typography>
      </CompletedBadge>
      {characters.length > 0 && (
        <>
          <Typography variant="bodyMedium" component="p" className={progress}>
            {t("books.progressLabel", {
              reviewed: statisticsByChapter.numberOfReviewedCharacters,
              total: characters.length,
              percent: Math.round(statisticsByChapter.reviewedRatio * 100),
            })}
          </Typography>
          <CharactersCard characters={characters} />
        </>
      )}
    </section>
  );
};
