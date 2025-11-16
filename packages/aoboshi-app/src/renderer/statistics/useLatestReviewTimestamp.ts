import { useFindLatestStatisticsIncrementQuery } from "~statistics/statisticsApi";

/**
 * Returns ISO 8601 datetime of the latest review synchronized from Anki
 */
export const useLatestReviewTimestamp = () => {
  return useFindLatestStatisticsIncrementQuery(undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      latestReviewTimestamp: data ? data.end : null,
      ...rest,
    }),
  });
};
