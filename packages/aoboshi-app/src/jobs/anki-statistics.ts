import { Temporal } from "@js-temporal/polyfill";
import {
  CardReview,
  NewCard,
  StatisticsIncrement,
} from "@vvornanen/aoboshi-core/statistics";
import { AnkiCard, AnkiCardReview } from "@vvornanen/aoboshi-anki";
import { isInstantAfter } from "@vvornanen/aoboshi-core";
import { getApplicationContext } from "~/worker";

const {
  ankiClient,
  properties,
  statisticsService,
  statisticsIncrementRepository,
  database,
} = getApplicationContext();

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
    console.log("No new reviews");
    return [];
  }

  const reviews = await ankiClient.getReviews(
    deckName,
    lastSyncTimestamp.toString(),
    limit,
  );
  const cards = await getCardsForReviews(reviews);

  return reviews
    .map((review) => {
      const card = cards.get(review.cardId);

      if (!card) {
        console.error(
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
  (reviewsAndNewCards: (CardReview | NewCard)[]) =>
    statisticsService.generateStatistics(reviewsAndNewCards),
);

const logStart = () => {
  console.log(`Generating statistics from Anki deck ${deckName}`);
};

const logAlreadyUpToDate = () => {
  console.log("No new reviews or cards found");
};

const logProcessing = (reviews: CardReview[]) => {
  console.log(
    `Processing ${reviews.length} reviews from ${reviews[0].reviewTime} to ${reviews[reviews.length - 1].reviewTime}`,
  );
};

const logResult = (increment: StatisticsIncrement) => {
  if (increment.numberOfNewCards > 0) {
    console.log(
      `Processed ${increment.numberOfReviews} reviews and ${increment.numberOfNewCards} new cards in ${increment.duration}ms`,
    );
  } else {
    console.log(
      `Processed ${increment.numberOfReviews} reviews in ${increment.duration}ms`,
    );
  }
};

(async () => {
  logStart();

  const reviews = await fetchReviews();
  const newCards = await fetchNewCards();
  const reviewsAndNewCards: (CardReview | NewCard)[] = [
    ...reviews,
    ...newCards,
  ];

  if (reviewsAndNewCards.length === 0) {
    logAlreadyUpToDate();
    return;
  }

  logProcessing(reviews);

  const increment = await doGenerateStatistics(reviewsAndNewCards);

  logResult(increment);
})();
