import {
  CardStatisticsByCharacter,
  StatisticsByCharacter,
} from "~/statistics/character";
import { StatisticsByDay } from "~/statistics/day";
import { StatisticsByChapter } from "~/statistics/chapter";
import {
  AnalysisContext,
  CardReview,
  NewCard,
  TimeZoneConfig,
} from "~/statistics";

type TestCase = AnalysisContext & Record<string, unknown>;

const timeZoneConfig: TimeZoneConfig[] = [{ timeZone: "UTC" }];

export const noReviews = {
  reviews: [],
  statisticsByCharacters: [],
  reviewDays: [],
  latestReviewTime: undefined,
  timeZoneConfig,
} satisfies TestCase;

export const oneCardOneReview = {
  reviews: [
    {
      cardId: 1452603672000,
      expression: "学ぶ",
      reviewTime: "2016-01-13T19:57:33.016Z",
    },
  ] satisfies CardReview[],
  getCardStatisticsByCharacter: (
    literal: string,
  ): CardStatisticsByCharacter | null => {
    if (literal === "学") {
      return {
        literal: "学",
        firstAdded: "2016-01-12T12:45:00Z",
        numberOfCards: 1,
      };
    }

    return null;
  },
  statisticsByCharacters: [
    {
      id: "1",
      literal: "学",
      firstAdded: "2016-01-12",
      firstReviewed: "2016-01-13",
      lastReviewed: "2016-01-13",
      numberOfReviews: 1,
      numberOfCards: 1,
    },
  ] satisfies StatisticsByCharacter[],
  reviewDays: ["2016-01-13"],
  latestReviewTime: "2016-01-13T19:57:33.016Z",
  timeZoneConfig,
} satisfies TestCase;

export const oneNewCardNoReviews = {
  reviews: [
    {
      cardId: 1452603672000,
      expression: "学ぶ",
    },
  ] satisfies [NewCard],
  getCardStatisticsByCharacter: (
    literal: string,
  ): CardStatisticsByCharacter | null => {
    if (literal === "学") {
      return {
        literal: "学",
        firstAdded: "2016-01-12T14:14:18Z",
        numberOfCards: 1,
      };
    }

    return null;
  },
  statisticsByCharacters: [
    {
      id: "1",
      literal: "学",
      firstAdded: "2016-01-12",
      firstReviewed: null,
      lastReviewed: null,
      numberOfReviews: 0,
      numberOfCards: 1,
    },
  ],
  reviewDays: [],
  latestReviewTime: undefined,
  timeZoneConfig,
} satisfies TestCase;

export const multipleReviews = {
  reviews: [
    {
      cardId: 1452603672000,
      expression: "学ぶ",
      reviewTime: "2016-01-13T19:57:33.016Z",
    },
    {
      cardId: 1452672000000,
      expression: "大学",
      reviewTime: "2016-01-13T19:58:01.023Z",
    },
    {
      cardId: 1448980638121,
      expression: "日",
      reviewTime: "2016-01-13T19:58:14.886Z",
    },
    {
      cardId: 1452603672000,
      expression: "学ぶ",
      reviewTime: "2016-01-14T20:15:02.330Z",
    },
  ] satisfies CardReview[],
  getCardStatisticsByCharacter: (
    literal: string,
  ): CardStatisticsByCharacter | null => {
    if (literal === "学") {
      return {
        literal: "学",
        firstAdded: "2016-01-12T08:14:59Z",
        numberOfCards: 2,
      };
    } else if (literal === "大") {
      return {
        literal: "大",
        firstAdded: "2016-01-12T18:19:02Z",
        numberOfCards: 1,
      };
    } else if (literal === "日") {
      return {
        literal: "日",
        firstAdded: "2015-12-01T21:58:04Z",
        numberOfCards: 5,
      };
    }

    return null;
  },
  statisticsByCharacters: [
    {
      id: "1",
      literal: "学",
      firstAdded: "2016-01-12",
      firstReviewed: "2016-01-13",
      lastReviewed: "2016-01-14",
      numberOfReviews: 3,
      numberOfCards: 2,
    },
    {
      id: "2",
      literal: "大",
      firstAdded: "2016-01-12",
      firstReviewed: "2016-01-13",
      lastReviewed: "2016-01-13",
      numberOfReviews: 1,
      numberOfCards: 1,
    },
    {
      id: "3",
      literal: "日",
      firstAdded: "2015-12-01",
      firstReviewed: "2016-01-13",
      lastReviewed: "2016-01-13",
      numberOfReviews: 1,
      numberOfCards: 5,
    },
  ],
  reviewDays: ["2016-01-13", "2016-01-14"],
  latestReviewTime: "2016-01-14T20:15:02.330Z",
  timeZoneConfig,
} satisfies TestCase;

export const seenCharacter = (
  value:
    | string
    | (Pick<StatisticsByCharacter, "literal"> & Partial<StatisticsByCharacter>),
) => {
  return {
    id: crypto.randomUUID(),
    firstAdded: "2015-12-01",
    firstReviewed: "2016-01-13",
    lastReviewed: "2016-01-13",
    numberOfReviews: 1,
    numberOfCards: 1,
    ...(typeof value === "string" ? { literal: value } : value),
  } satisfies StatisticsByCharacter;
};

export const unseenCharacter = (
  value:
    | string
    | (Pick<StatisticsByCharacter, "literal"> & Partial<StatisticsByCharacter>),
) => {
  return {
    id: crypto.randomUUID(),
    firstAdded: null,
    firstReviewed: null,
    lastReviewed: null,
    numberOfReviews: 0,
    numberOfCards: 0,
    ...(typeof value === "string" ? { literal: value } : value),
  } satisfies StatisticsByCharacter;
};

export const newCharacter = (
  value:
    | string
    | (Pick<StatisticsByCharacter, "literal"> & Partial<StatisticsByCharacter>),
) => {
  return {
    id: crypto.randomUUID(),
    firstAdded: "2015-12-01",
    firstReviewed: null,
    lastReviewed: null,
    numberOfReviews: 0,
    numberOfCards: 1,
    ...(typeof value === "string" ? { literal: value } : value),
  } satisfies StatisticsByCharacter;
};

export const statisticsByDay = (
  value: string | (Pick<StatisticsByDay, "date"> & Partial<StatisticsByDay>),
) => {
  const valueAsObject = typeof value === "string" ? { date: value } : value;

  return {
    id: crypto.randomUUID(),
    addedCharacters: "",
    firstSeenCharacters: "",
    reviewedCharacters: "",
    ...valueAsObject,
    numberOfAddedCharacters: valueAsObject.addedCharacters?.length || 0,
    numberOfFirstSeenCharacters: valueAsObject.firstSeenCharacters?.length || 0,
    numberOfReviewedCharacters: valueAsObject.reviewedCharacters?.length || 0,
    numberOfReviews: valueAsObject.numberOfReviews || 0,
  } satisfies StatisticsByDay;
};

export const statisticsByChapter = (
  value: Pick<StatisticsByChapter, "bookId" | "chapterId"> &
    Partial<StatisticsByChapter>,
) => {
  return {
    id: crypto.randomUUID(),
    seenCharacters: "",
    newCharacters: "",
    unseenCharacters: "",
    numberOfSeenCharacters: 0,
    numberOfNewCharacters: 0,
    numberOfUnseenCharacters: 0,
    totalNumberOfCharacters: 0,
    ...value,
  } satisfies StatisticsByChapter;
};
