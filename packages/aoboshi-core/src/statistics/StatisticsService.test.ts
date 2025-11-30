import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { mock } from "vitest-mock-extended";
import * as fixtures from "./statisticsFixtures";
import {
  AnalysisContext,
  StatisticsIncrement,
  StatisticsIncrementRepository,
  StatisticsService,
} from "~/statistics";
import { randomId } from "~/randomId";
import { SettingsService } from "~/settings";
import { PreProcessingAnalyzer } from "~/statistics/PreProcessingAnalyzer";

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
const analyzer1 = mock<PreProcessingAnalyzer>();
const analyzer2 = mock<PreProcessingAnalyzer>();

const statisticsService = new StatisticsService(
  [analyzer1, analyzer2],
  statisticsIncrementRepository,
  mockSettingsService,
);

const mockPerformance = mock<Performance>();
vi.stubGlobal("performance", mockPerformance);

beforeEach(() => {
  mockRandomId();

  mockSettingsService.getSettings.mockReturnValue({
    timeZoneConfig: [{ timeZone: "UTC" }],
  });

  mockPerformance.mark.mockImplementation((name) => new PerformanceMark(name));
  mockPerformance.measure.mockReturnValueOnce(
    mock<PerformanceMeasure>({ duration: 1213 }),
  );
});

afterEach(() => {
  vi.resetAllMocks();
});

const testCase = fixtures.oneCardOneReview;

const initialContextValue = {
  reviews: testCase.reviews,
  statisticsByCharacters: [],
  reviewDays: [],
  latestReviewTime: undefined,
  timeZoneConfig: [{ timeZone: "UTC" }],
};

describe("prepareStatistics", () => {
  const analyzer1ResolvedValue: AnalysisContext = {
    reviews: testCase.reviews,
    statisticsByCharacters: testCase.statisticsByCharacters,
    reviewDays: testCase.reviewDays,
    latestReviewTime: testCase.latestReviewTime,
    timeZoneConfig: testCase.timeZoneConfig,
  };

  beforeEach(() => {
    analyzer1.prepare.mockResolvedValueOnce(analyzer1ResolvedValue);
    analyzer2.prepare.mockResolvedValue();
  });

  test("calls first analyzer with initial context", async () => {
    await statisticsService.prepareStatistics(testCase.reviews);
    expect(analyzer1.prepare).toHaveBeenCalledWith(initialContextValue);
  });

  test("passes context returned from previous analyzer", async () => {
    await statisticsService.prepareStatistics(testCase.reviews);
    expect(analyzer2.prepare).toHaveBeenCalledWith(analyzer1ResolvedValue);
  });
});

describe("generateStatistics", () => {
  const analyzer1ReturnValue: AnalysisContext = {
    reviews: testCase.reviews,
    statisticsByCharacters: testCase.statisticsByCharacters,
    reviewDays: testCase.reviewDays,
    latestReviewTime: testCase.latestReviewTime,
    timeZoneConfig: testCase.timeZoneConfig,
  };

  beforeEach(() => {
    analyzer1.run.mockReturnValueOnce(analyzer1ReturnValue);
  });

  test("calls first analyzer with initial context", () => {
    statisticsService.generateStatistics(initialContextValue);
    expect(analyzer1.run).toHaveBeenCalledWith(initialContextValue);
  });

  test("passes context returned from previous analyzer", () => {
    statisticsService.generateStatistics(initialContextValue);
    expect(analyzer2.run).toHaveBeenCalledWith(analyzer1ReturnValue);
  });

  test("saves increment", () => {
    mockRandomId("random id");

    statisticsService.generateStatistics(initialContextValue);

    expect(statisticsIncrementRepository.save).toHaveBeenCalledWith({
      id: "random id",
      start: null,
      end: testCase.latestReviewTime,
      numberOfReviews: 1,
      numberOfNewCards: 0,
      duration: 1213,
    } satisfies StatisticsIncrement);
  });

  test("continues from previous increment", () => {
    mockRandomId("random id");

    statisticsIncrementRepository.findLatest.mockReturnValueOnce({
      id: "existing id",
      start: null,
      end: "2016-01-13T17:02:13.111Z",
      numberOfReviews: 1,
      numberOfNewCards: 0,
      duration: 213,
    } satisfies StatisticsIncrement);

    statisticsService.generateStatistics(initialContextValue);

    expect(statisticsIncrementRepository.save).toHaveBeenCalledWith({
      id: "random id",
      start: "2016-01-13T17:02:13.111Z",
      end: testCase.latestReviewTime,
      numberOfReviews: 1,
      numberOfNewCards: 0,
      duration: 1213,
    } satisfies StatisticsIncrement);
  });

  test("saves number of new cards", () => {
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

    statisticsService.generateStatistics(initialContextValue);

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
