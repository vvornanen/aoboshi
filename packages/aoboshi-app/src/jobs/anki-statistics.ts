import { parentPort, workerData } from "node:worker_threads";
import { Temporal } from "@js-temporal/polyfill";
import {
  CardReview,
  NewCard,
  StatisticsIncrement,
} from "@vvornanen/aoboshi-core/statistics";
import { FibonacciScheduler } from "@vvornanen/aoboshi-core";
import { Logger, getApplicationContext, postMessage } from "~/worker";

const {
  ankiService,
  properties,
  settingsService,
  statisticsService,
  statisticsIncrementRepository,
  database,
} = getApplicationContext();

const logger = new Logger(workerData.job?.name);
logger.setLogLevel(properties.logLevel);

const getLastSyncTimestamp = () => {
  const lastIncrement = statisticsIncrementRepository.findLatest();
  return lastIncrement?.end
    ? Temporal.Instant.from(lastIncrement.end)
    : Temporal.Instant.fromEpochSeconds(0);
};

const doGenerateStatistics = database.transaction(
  (reviewsAndNewCards: (CardReview | NewCard)[], startMark: string) =>
    statisticsService.generateStatistics(reviewsAndNewCards, startMark),
);

const logStart = () => {
  if (logger.isDebugEnabled()) {
    const settings = settingsService.getSettings();
    logger.debug(
      `Generating statistics from Anki deck ${settings.anki?.deckName}`,
    );
  }
};

const logAlreadyUpToDate = () => {
  logger.debug("No new reviews or cards found");
};

const logProcessing = (reviews: CardReview[]) => {
  logger.debug(
    `Processing ${reviews.length} reviews from ${reviews.at(0)?.reviewTime} to ${reviews.at(-1)?.reviewTime}`,
  );
};

const logResult = (
  increment: StatisticsIncrement,
  numberOfReviewsProcessed: number,
  totalNumberOfReviews: number,
) => {
  logger.info(
    `Processed ${numberOfReviewsProcessed}/${totalNumberOfReviews} reviews${increment.numberOfNewCards > 0 ? ` and ${increment.numberOfNewCards} new cards` : ""} from ${increment.start} to ${increment.end} in ${Math.round(increment.duration)}ms`,
  );
};

const limit = 1000;
let numberOfReviewsProcessed = 0;
let totalNumberOfReviews = 0;

const resetProgress = () => {
  numberOfReviewsProcessed = 0;
  totalNumberOfReviews = 0;
  reportProgress();
};

const updateProgress = (
  numberOfReviewsInIncrement: number,
  numberOfReviewsRemaining: number,
) => {
  totalNumberOfReviews =
    numberOfReviewsProcessed +
    numberOfReviewsInIncrement +
    numberOfReviewsRemaining;
  numberOfReviewsProcessed += numberOfReviewsInIncrement;
  reportProgress();
  postMessage({ type: "invalidateTags", tags: ["LatestStatisticsIncrement"] });
};

const isLongRunningProcess = () => totalNumberOfReviews > limit;

const reportProgress = () => {
  const value =
    totalNumberOfReviews > 0 && isLongRunningProcess()
      ? numberOfReviewsProcessed / totalNumberOfReviews
      : -1;
  postMessage({ type: "progress", value });
};

const run = async (): Promise<number> => {
  const startMark = performance.mark("startAnkiStatistics").name;
  logStart();

  const { meta, reviews } = await ankiService.fetchReviews(
    getLastSyncTimestamp(),
    limit,
  );

  if (reviews.length === 0) {
    logAlreadyUpToDate();
    resetProgress();
    return 0;
  }

  updateProgress(0, meta.totalNumberOfReviews);

  const newCards = await ankiService.fetchNewCards();
  const reviewsAndNewCards: (CardReview | NewCard)[] = [
    ...reviews,
    ...newCards,
  ];

  logProcessing(reviews);
  const increment = await doGenerateStatistics(reviewsAndNewCards, startMark);
  updateProgress(
    increment.numberOfReviews,
    meta.totalNumberOfReviews - increment.numberOfReviews,
  );
  logResult(increment, numberOfReviewsProcessed, totalNumberOfReviews);

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
  resetProgress();
  postMessage("cancelled");
};

const settings = settingsService.getSettings();

if (!settings.anki) {
  logger.info("Skipping because Anki integration is disabled");
} else {
  scheduler.start();
}

if (parentPort) {
  parentPort.once("message", (message) => {
    if (message === "cancel") {
      cancel();
    }
  });
}
