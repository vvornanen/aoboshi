import { CardReview, NewCard } from "./CardReview";
import { StatisticsByCharacter } from "./StatisticsByCharacter";
import { TimeZoneConfig } from "./statisticsUtils";

export type AnalysisContext = {
  reviews: (CardReview | NewCard)[];
  statisticsByCharacters: StatisticsByCharacter[];
  latestReviewTime: string | undefined;
  reviewDays: string[];
  timeZoneConfig: TimeZoneConfig[];
};

export interface Analyzer {
  run: (
    context: AnalysisContext,
  ) => AnalysisContext | void | Promise<AnalysisContext> | Promise<void>;
}
