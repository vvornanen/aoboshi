import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { mock } from "vitest-mock-extended";
import * as fixtures from "./statisticsFixtures";
import {
  AnalysisContext,
  Analyzer,
  StatisticsIncrement,
  StatisticsIncrementRepository,
  StatisticsService,
} from "~/statistics";
import { randomId } from "~/randomId";
import { SettingsService } from "~/settings";

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

const mockSettingsService = mock<SettingsService>();

const statisticsIncrementRepository = mock<StatisticsIncrementRepository>();
const analyzer1 = mock<Analyzer>();
const analyzer2 = mock<Analyzer>();

const statisticsService = new StatisticsService(
  [analyzer1, analyzer2],
  statisticsIncrementRepository,
  mockSettingsService,
);

const mockPerformace = mock<Performance>();
vi.stubGlobal("performance", mockPerformace);

beforeEach(() => {
  mockRandomId();

  mockSettingsService.getSettings.mockReturnValue({
    timeZoneConfig: [{ timeZone: "UTC" }],
  });

  mockPerformace.mark.mockImplementation((name) => new PerformanceMark(name));
  mockPerformace.measure.mockReturnValueOnce(
    mock<PerformanceMeasure>({ duration: 1213 }),
  );
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

    await statisticsService.generateStatistics(testCase.reviews);

    expect(statisticsIncrementRepository.save).toHaveBeenCalledWith({
      id: "random id",
      start: null,
      end: testCase.latestReviewTime,
      numberOfReviews: 1,
      numberOfNewCards: 0,
      duration: 1213,
    } satisfies StatisticsIncrement);
  });

  test("continues from previous increment", async () => {
    mockRandomId("random id");

    statisticsIncrementRepository.findLatest.mockReturnValueOnce({
      id: "existing id",
      start: null,
      end: "2016-01-13T17:02:13.111Z",
      numberOfReviews: 1,
      numberOfNewCards: 0,
      duration: 213,
    } satisfies StatisticsIncrement);

    await statisticsService.generateStatistics(testCase.reviews);

    expect(statisticsIncrementRepository.save).toHaveBeenCalledWith({
      id: "random id",
      start: "2016-01-13T17:02:13.111Z",
      end: testCase.latestReviewTime,
      numberOfReviews: 1,
      numberOfNewCards: 0,
      duration: 1213,
    } satisfies StatisticsIncrement);
  });

  test("saves number of new cards", async () => {
    const testCase = fixtures.oneNewCardNoReviews;

    const context: AnalysisContext = {
      reviews: testCase.reviews,
      statisticsByCharacters: testCase.statisticsByCharacters,
      reviewDays: testCase.reviewDays,
      latestReviewTime: testCase.latestReviewTime,
      timeZoneConfig: testCase.timeZoneConfig,
    };

    analyzer1.run.mockReset();
    analyzer1.run.mockReturnValueOnce(context);

    mockRandomId("random id");

    await statisticsService.generateStatistics(testCase.reviews);

    expect(statisticsIncrementRepository.save).toHaveBeenCalledWith({
      id: "random id",
      start: null,
      end: null,
      numberOfReviews: 0,
      numberOfNewCards: 1,
      duration: 1213,
    } satisfies StatisticsIncrement);
  });
});
