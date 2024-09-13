import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import { mock } from "vitest-mock-extended";
import { AnkiCard, AnkiClient } from "@vvornanen/aoboshi-anki";
import { Temporal } from "@js-temporal/polyfill";
import { AnkiService } from "~/worker/anki";
import { AppSettingsService } from "~/worker/settings";

const deckName = "test";
const ttl = Temporal.Duration.from({ milliseconds: 1000 });

const cardIds = Array.from(
  { length: 1500 },
  (_, index) =>
    Temporal.Instant.from("2024-01-01T00:00:00.000Z").add(
      Temporal.Duration.from({ milliseconds: index }),
    ).epochMilliseconds,
);

const mockSettingsService = mock<AppSettingsService>();
const mockAnkiClient = mock<AnkiClient>();
let ankiService: AnkiService;

beforeAll(() => {
  vi.useFakeTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

beforeEach(() => {
  mockSettingsService.getSettings.mockReturnValue({
    timeZoneConfig: [{ timeZone: "UTC" }],
    anki: {
      url: "http://localhost:3000",
      apiKey: "secret",
      deckName: "test",
    },
  });

  ankiService = new AnkiService({ logLevel: "info" }, mockSettingsService);
  ankiService.setTTL(ttl);
  ankiService.setAnkiClient(mockAnkiClient);
});

afterEach(() => {
  vi.resetAllMocks();
});

describe("getCardIdsByLiteral", () => {
  test("fetches cards under limit", async () => {
    mockOneCard();

    const actual = await ankiService.getCardIdsByLiteral("学");

    expect(actual).toEqual([cardIds[0]]);
    expect(mockAnkiClient.getCards).toHaveBeenCalledOnce();
  });

  test("fetches over limit", async () => {
    mockAllCards();

    const actual = await ankiService.getCardIdsByLiteral("学");

    expect(actual).toHaveLength(cardIds.length);
    expect(mockAnkiClient.getCards).toHaveBeenCalledTimes(2);
  });

  test("no cards", async () => {
    mockNoCards();

    const actual = await ankiService.getCardIdsByLiteral("学");

    expect(actual).toHaveLength(0);
    expect(mockAnkiClient.getCards).not.toHaveBeenCalled();
  });

  test("returns cached card ids", async () => {
    mockOneCard();
    const actual1 = await ankiService.getCardIdsByLiteral("学");
    expect(actual1).toHaveLength(1);

    vi.advanceTimersByTime(ttl.milliseconds - 1);
    mockAllCards();
    const actual2 = await ankiService.getCardIdsByLiteral("学");
    expect(actual2).toHaveLength(1);

    expect(mockAnkiClient.findCardIds).toHaveBeenCalledTimes(1);
  });

  test("re-fetches card after cache is expired", async () => {
    mockOneCard();
    const actual1 = await ankiService.getCardIdsByLiteral("学");
    expect(actual1).toHaveLength(1);

    vi.advanceTimersByTime(ttl.milliseconds);
    mockAllCards();
    const actual2 = await ankiService.getCardIdsByLiteral("学");
    expect(actual2).toHaveLength(cardIds.length);

    expect(mockAnkiClient.findCardIds).toHaveBeenCalledTimes(2);
  });

  test("card missing expression field", async () => {
    mockAnkiClient.findCardIds
      .calledWith(`deck:${deckName}`)
      .mockResolvedValue([1]);
    mockAnkiClient.getCards.mockResolvedValue([
      {
        ...mockCard,
        id: 1,
        fields: {},
      },
    ] satisfies AnkiCard[]);

    await expect(() =>
      ankiService.getCardIdsByLiteral("学"),
    ).rejects.toThrowError("Expected card to have field 'Expression'");
  });
});

const mockCard: AnkiCard = {
  id: 0,
  created: "",
  modified: "",
  fields: {
    Expression: { value: "大学", order: 0 },
  },
  modelName: "",
  deckName: "",
  easeFactor: 0,
  interval: "",
  noteId: 0,
  status: "new",
  numberOfReviews: 0,
  numberOfLapses: 0,
  numberOfRemainingReviews: {
    today: 0,
    untilGraduation: 0,
  },
};

const mockNoCards = () => {
  mockAnkiClient.findCardIds
    .calledWith(`deck:${deckName}`)
    .mockResolvedValue([]);
};

const mockOneCard = () => {
  const oneCardId = [cardIds[0]];

  mockAnkiClient.findCardIds
    .calledWith(`deck:${deckName}`)
    .mockResolvedValue(oneCardId);
  mockAnkiClient.getCards.mockResolvedValue([
    {
      ...mockCard,
      id: oneCardId[0],
      fields: {
        Expression: { value: "大学", order: 0 },
      },
    },
  ] satisfies AnkiCard[]);
};

const mockAllCards = () => {
  mockAnkiClient.findCardIds
    .calledWith(`deck:${deckName}`)
    .mockResolvedValue(cardIds);
  mockAnkiClient.getCards.mockResolvedValueOnce(
    cardIds.slice(0, 1000).map(
      (cardId) =>
        ({
          ...mockCard,
          id: cardId,
          fields: {
            Expression: { value: `大学 #${cardId}`, order: 0 },
          },
        }) satisfies AnkiCard,
    ),
  );
  mockAnkiClient.getCards.mockResolvedValueOnce(
    cardIds.slice(1000).map(
      (cardId) =>
        ({
          ...mockCard,
          id: cardId,
          fields: {
            Expression: { value: `大学 #${cardId}`, order: 0 },
          },
        }) satisfies AnkiCard,
    ),
  );
};
