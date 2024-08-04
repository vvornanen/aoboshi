import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { mock } from "vitest-mock-extended";
import { Temporal } from "@js-temporal/polyfill";
import * as fixtures from "./statisticsFixtures";
import {
  AnalysisContext,
  Analyzer,
  StatisticsIncrement,
  StatisticsIncrementRepository,
  StatisticsService,
} from "~/statistics";
import { randomId } from "~/randomId";

vi.mock("~/randomId", () => {
  return {
    randomId: vi.fn(),
  };
});

const mockRandomId = (value?: string) => {
  let autoIncrement = 1;

  if (vi.isMockFunction(randomId)) {
    randomId.mockImplementation(() => value || String(autoIncrement++));
  }
};

const statisticsIncrementRepository = mock<StatisticsIncrementRepository>();
const analyzer1 = mock<Analyzer>();
const analyzer2 = mock<Analyzer>();

const statisticsService = new StatisticsService(
  [analyzer1, analyzer2],
  statisticsIncrementRepository,
);

beforeEach(() => {
  mockRandomId();
});

afterEach(() => {
  vi.resetAllMocks();
});

describe("generateStatistics", () => {
  const testCase = fixtures.oneCardOneReview;

  beforeEach(() => {
    const context: AnalysisContext = {
      reviews: testCase.reviews,
      statisticsByCharacters: testCase.statisticsByCharacters,
      reviewDays: testCase.reviewDays,
      latestReviewTime: testCase.latestReviewTime,
      timeZoneConfig: testCase.timeZoneConfig,
    };

    analyzer1.run.mockReturnValueOnce(context);
  });

  test("calls first analyzer with initial context", async () => {
    await statisticsService.generateStatistics(testCase.reviews);
    expect(analyzer1.run).toHaveBeenCalledWith({
      reviews: testCase.reviews,
      statisticsByCharacters: [],
      reviewDays: [],
      latestReviewTime: undefined,
      timeZoneConfig: [{ timeZone: "UTC" }],
    });
  });

  test("passes context returned from previous analyzer", async () => {
    const context: AnalysisContext = {
      reviews: testCase.reviews,
      statisticsByCharacters: testCase.statisticsByCharacters,
      reviewDays: testCase.reviewDays,
      latestReviewTime: testCase.latestReviewTime,
      timeZoneConfig: testCase.timeZoneConfig,
    };

    analyzer1.run.mockReturnValueOnce(context);

    await statisticsService.generateStatistics(testCase.reviews);

    expect(analyzer2.run).toHaveBeenCalledWith(context);
  });

  test("saves increment", async () => {
    mockRandomId("random id");
    const spy = vi.spyOn(Temporal.Now, "instant");
    spy.mockReturnValueOnce(Temporal.Instant.from("2016-01-14T12:15:10.121Z"));
    spy.mockReturnValueOnce(Temporal.Instant.from("2016-01-14T12:15:11.334Z"));

    await statisticsService.generateStatistics(testCase.reviews);

    expect(statisticsIncrementRepository.save).toHaveBeenCalledWith({
      id: "random id",
      start: null,
      end: testCase.latestReviewTime,
      numberOfReviews: 1,
      duration: 1213,
    } satisfies StatisticsIncrement);
  });

  test("continues from previous increment", async () => {
    mockRandomId("random id");
    const spy = vi.spyOn(Temporal.Now, "instant");
    spy.mockReturnValueOnce(Temporal.Instant.from("2016-01-14T12:15:10.121Z"));
    spy.mockReturnValueOnce(Temporal.Instant.from("2016-01-14T12:15:11.334Z"));

    statisticsIncrementRepository.findLatest.mockReturnValueOnce({
      id: "existing id",
      start: null,
      end: "2016-01-13T17:02:13.111Z",
      numberOfReviews: 1,
      duration: 213,
    } satisfies StatisticsIncrement);

    await statisticsService.generateStatistics(testCase.reviews);

    expect(statisticsIncrementRepository.save).toHaveBeenCalledWith({
      id: "random id",
      start: "2016-01-13T17:02:13.111Z",
      end: testCase.latestReviewTime,
      numberOfReviews: 1,
      duration: 1213,
    } satisfies StatisticsIncrement);
  });
});
