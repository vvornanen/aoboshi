import { CardReview, NewCard } from "./CardReview";
import { StatisticsByCharacter } from "./character/StatisticsByCharacter";
import { TimeZoneConfig } from "./statisticsUtils";

export type AnalysisContext = {
  reviews: (CardReview | NewCard)[];
  statisticsByCharacters: StatisticsByCharacter[];
  latestReviewTime: string | undefined;
  reviewDays: string[];
  timeZoneConfig: TimeZoneConfig[];
};
