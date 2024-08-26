import { parentPort, workerData } from "node:worker_threads";
import { Temporal } from "@js-temporal/polyfill";
import {
  CardReview,
  NewCard,
  StatisticsIncrement,
} from "@vvornanen/aoboshi-core/statistics";
import { AnkiCard, AnkiCardReview } from "@vvornanen/aoboshi-anki";
import { FibonacciScheduler, isInstantAfter } from "@vvornanen/aoboshi-core";
import { Logger, getApplicationContext } from "~/worker";

const {
  ankiClient,
  properties,
  statisticsService,
  statisticsIncrementRepository,
  database,
} = getApplicationContext();

const logger = new Logger(workerData.job?.name);
logger.setLogLevel(properties.logLevel);

const deckName = properties.anki.deckName;

const getLastSyncTimestamp = () => {
  const lastIncrement = statisticsIncrementRepository.findLatest();
  return lastIncrement?.end
    ? Temporal.Instant.from(lastIncrement.end)
    : Temporal.Instant.fromEpochSeconds(0);
};

const getLatestReviewTimestamp = async () => {
  const result = await ankiClient.getLatestReviewTimestamp(deckName);
  return result === null ? null : Temporal.Instant.from(result);
};

const getUniqueCardIds = (reviews: AnkiCardReview[]) => {
  const cardIds = new Set<number>(reviews.map((review) => review.cardId));
  return Array.from(cardIds);
};

const getCardsForReviews = async (reviews: AnkiCardReview[]) => {
  const cards = await ankiClient.getCards(getUniqueCardIds(reviews));

  const cardsMap = new Map<number, AnkiCard>();
  cards.forEach((card) => cardsMap.set(card.id, card));

  return cardsMap;
};

const getExpression = (card: AnkiCard) => card.fields["Expression"]?.value;

const fetchReviews = async (limit = 100): Promise<CardReview[]> => {
  const latestReviewTimestamp = await getLatestReviewTimestamp();
  const lastSyncTimestamp = getLastSyncTimestamp();

  if (!isInstantAfter(latestReviewTimestamp, lastSyncTimestamp)) {
    return [];
  }

  const { reviews } = await ankiClient.getReviews(
    deckName,
    lastSyncTimestamp.toString(),
    limit,
  );
  const cards = await getCardsForReviews(reviews);

  return reviews
    .map((review) => {
      const card = cards.get(review.cardId);

      if (!card) {
        logger.error(
          `Card ${review.cardId} was not found, review time ${review.reviewTime}`,
        );
        return null;
      }

      return {
        cardId: review.cardId,
        reviewTime: review.reviewTime,
        expression: getExpression(card),
      };
    })
    .filter((review) => review !== null);
};

const fetchNewCards = async (): Promise<NewCard[]> => {
  const cards = await ankiClient.findCards(`deck:${deckName} is:new`);

  return cards.map((card) => ({
    cardId: card.id,
    expression: getExpression(card),
  }));
};

const doGenerateStatistics = database.transaction(
  (reviewsAndNewCards: (CardReview | NewCard)[], startMark: string) =>
    statisticsService.generateStatistics(reviewsAndNewCards, startMark),
);

const logStart = () => {
  logger.debug(`Generating statistics from Anki deck ${deckName}`);
};

const logAlreadyUpToDate = () => {
  logger.debug("No new reviews or cards found");
};

const logProcessing = (reviews: CardReview[]) => {
  logger.debug(
    `Processing ${reviews.length} reviews from ${reviews.at(0)?.reviewTime} to ${reviews.at(-1)?.reviewTime}`,
  );
};

const logResult = (increment: StatisticsIncrement) => {
  logger.info(
    `Processed ${increment.numberOfReviews} reviews${increment.numberOfNewCards > 0 ? ` and ${increment.numberOfNewCards} new cards` : ""} from ${increment.start} to ${increment.end} in ${Math.round(increment.duration)}ms`,
  );
};

const run = async (): Promise<number> => {
  const startMark = performance.mark("startAnkiStatistics").name;
  logStart();

  const limit = 1000;

  const reviews = await fetchReviews(limit);
  const newCards = await fetchNewCards();
  const reviewsAndNewCards: (CardReview | NewCard)[] = [
    ...reviews,
    ...newCards,
  ];

  if (reviews.length === 0) {
    logAlreadyUpToDate();
    return 0;
  }

  logProcessing(reviews);
  const increment = await doGenerateStatistics(reviewsAndNewCards, startMark);
  logResult(increment);

  return reviews.length;
};

const scheduler = new FibonacciScheduler(async () => {
  try {
    const numberOfReviewsProcessed = await run();

    if (numberOfReviewsProcessed > 0) {
      scheduler.reset();
    }
  } catch (error) {
    console.error(error);
  }
});

const cancel = () => {
  scheduler.stop();

  if (parentPort) {
    parentPort.postMessage("cancelled");
  } else {
    process.exit(1);
  }
};

scheduler.start();

if (parentPort) {
  parentPort.once("message", (message) => {
    if (message === "cancel") {
      cancel();
    }
  });
}
