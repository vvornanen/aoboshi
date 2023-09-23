import { AnkiClient } from "./AnkiClient";
import { card1, card2, note1, note2 } from "./fixtures";
import { AnkiCardReview, ReviewType } from "./AnkiCardReview";

const mockFetch = jest.fn();

global.fetch = mockFetch as jest.Mock;

afterEach(() => {
  mockFetch.mockReset();
});

const mockResponse = (status: number, body: unknown) => {
  mockFetch.mockImplementationOnce(async () => ({
    status,
    json: async () => body,
  }));
};

const ankiUrl = "http://localhost:8000";
const apiKey = "test";
const client = new AnkiClient(ankiUrl, apiKey);

test("not found", () => {
  mockResponse(404, null);

  expect(client.getLatestReviewTimestamp("deck")).rejects.toThrowError(
    "Anki request failed",
  );
});

test("invalid api key", () => {
  mockResponse(200, {
    result: null,
    error: "valid api key must be provided",
  });

  expect(client.getLatestReviewTimestamp("deck")).rejects.toThrowError(
    "Anki request failed: valid api key must be provided",
  );
});

test("importPackage", async () => {
  mockResponse(200, {
    result: true,
    error: null,
  });

  const result = await client.importPackage("/path/to/test.apkg");

  expect(result).toBeTruthy();
  expect(mockFetch).toHaveBeenNthCalledWith(1, ankiUrl, {
    method: "POST",
    body: JSON.stringify({
      action: "importPackage",
      version: 6,
      key: apiKey,
      params: { path: "/path/to/test.apkg" },
    }),
  });
});

test("exportPackage", async () => {
  mockResponse(200, {
    result: true,
    error: null,
  });

  const result = await client.exportPackage("test", "/path/to/test.apkg");
  expect(result).toBeTruthy();

  expect(mockFetch).toHaveBeenNthCalledWith(1, ankiUrl, {
    method: "POST",
    body: JSON.stringify({
      action: "exportPackage",
      version: 6,
      key: apiKey,
      params: { deck: "test", path: "/path/to/test.apkg" },
    }),
  });
});

test("getAllDecks", async () => {
  mockResponse(200, {
    result: ["Deck 1", "Deck 2"],
    error: null,
  });

  const result = await client.getAllDecks();

  expect(mockFetch).toHaveBeenNthCalledWith(1, ankiUrl, {
    method: "POST",
    body: JSON.stringify({
      action: "deckNames",
      version: 6,
      key: apiKey,
    }),
  });
  expect(result).toEqual(["Deck 1", "Deck 2"]);
});

test("deleteDecks", async () => {
  mockResponse(200, {
    result: null,
    error: null,
  });

  await client.deleteDecks(["deck1", "deck2"]);

  expect(mockFetch).toHaveBeenNthCalledWith(1, ankiUrl, {
    method: "POST",
    body: JSON.stringify({
      action: "deleteDecks",
      version: 6,
      key: apiKey,
      params: { decks: ["deck1", "deck2"], cardsToo: true },
    }),
  });
});

describe("getLatestReviewTimestamp", () => {
  test("deck exists", async () => {
    mockResponse(200, {
      result: 1684410316797,
      error: null,
    });

    const actual = await client.getLatestReviewTimestamp("test");

    expect(mockFetch).toHaveBeenNthCalledWith(1, ankiUrl, {
      method: "POST",
      body: JSON.stringify({
        action: "getLatestReviewID",
        version: 6,
        key: apiKey,
        params: { deck: "test" },
      }),
    });
    expect(actual).toEqual("2023-05-18T11:45:16.797Z");
  });

  test("deck does not exist", async () => {
    mockResponse(200, {
      result: 0,
      error: null,
    });

    const actual = await client.getLatestReviewTimestamp("test");

    expect(mockFetch).toHaveBeenNthCalledWith(1, ankiUrl, {
      method: "POST",
      body: JSON.stringify({
        action: "getLatestReviewID",
        version: 6,
        key: apiKey,
        params: { deck: "test" },
      }),
    });
    expect(actual).toBeNull();
  });
});

describe("getAllCards", () => {
  test("no cards", async () => {
    mockResponse(200, {
      result: [],
      error: null,
    });

    const actual = await client.getAllCards("test");

    expect(mockFetch).toHaveBeenNthCalledWith(1, ankiUrl, {
      method: "POST",
      body: JSON.stringify({
        action: "findCards",
        version: 6,
        key: apiKey,
        params: { query: "deck:test" },
      }),
    });
    expect(actual).toHaveLength(0);
  });

  test("returns cards", async () => {
    mockResponse(200, {
      result: [card1.cardId, card2.cardId],
      error: null,
    });
    mockResponse(200, {
      result: [card1, card2],
      error: null,
    });

    const actual = await client.getAllCards("test");

    expect(mockFetch).toHaveBeenNthCalledWith(1, ankiUrl, {
      method: "POST",
      body: JSON.stringify({
        action: "findCards",
        version: 6,
        key: apiKey,
        params: { query: "deck:test" },
      }),
    });
    expect(actual).toEqual([card1, card2]);
  });
});

describe("findCards", () => {
  test("no cards", async () => {
    mockResponse(200, {
      result: [],
      error: null,
    });

    const actual = await client.findCards("test");

    expect(mockFetch).toHaveBeenNthCalledWith(1, ankiUrl, {
      method: "POST",
      body: JSON.stringify({
        action: "findCards",
        version: 6,
        key: apiKey,
        params: { query: "test" },
      }),
    });
    expect(actual).toHaveLength(0);
  });

  test("returns cards", async () => {
    mockResponse(200, {
      result: [card1.cardId, card2.cardId],
      error: null,
    });
    mockResponse(200, {
      result: [card1, card2],
      error: null,
    });

    const actual = await client.findCards("test");

    expect(mockFetch).toHaveBeenNthCalledWith(1, ankiUrl, {
      method: "POST",
      body: JSON.stringify({
        action: "findCards",
        version: 6,
        key: apiKey,
        params: { query: "test" },
      }),
    });
    expect(mockFetch).toHaveBeenNthCalledWith(2, ankiUrl, {
      method: "POST",
      body: JSON.stringify({
        action: "cardsInfo",
        version: 6,
        key: apiKey,
        params: { cards: [card1.cardId, card2.cardId] },
      }),
    });
    expect(actual).toEqual([card1, card2]);
  });
});

describe("getNotes", () => {
  test("notes not found", async () => {
    mockResponse(200, {
      result: [{}, {}],
      error: null,
    });

    const noteIds = [note1.noteId, note2.noteId];
    const actual = await client.getNotes(noteIds);

    expect(mockFetch).toHaveBeenCalledWith(ankiUrl, {
      method: "POST",
      body: JSON.stringify({
        action: "notesInfo",
        version: 6,
        key: apiKey,
        params: { notes: noteIds },
      }),
    });
    expect(actual).toEqual([{}, {}]);
  });

  test("returns notes", async () => {
    mockResponse(200, {
      result: [note1, note2],
      error: null,
    });

    const noteIds = [note1.noteId, note2.noteId];
    const actual = await client.getNotes(noteIds);

    expect(mockFetch).toHaveBeenCalledWith(ankiUrl, {
      method: "POST",
      body: JSON.stringify({
        action: "notesInfo",
        version: 6,
        key: apiKey,
        params: { notes: [note1.noteId, note2.noteId] },
      }),
    });
    expect(actual).toEqual([note1, note2]);
  });
});

describe("getReviews", () => {
  test("empty result", async () => {
    mockResponse(200, {
      result: [],
      error: null,
    });

    const actual = await client.getReviews("test", "2023-05-18T19:13:52.547Z");

    expect(mockFetch).toHaveBeenNthCalledWith(1, ankiUrl, {
      method: "POST",
      body: JSON.stringify({
        action: "cardReviews",
        version: 6,
        key: apiKey,
        params: { deck: "test", startID: 1684437232547 },
      }),
    });
    expect(actual).toHaveLength(0);
  });

  test("returns reviews", async () => {
    mockResponse(200, {
      result: [
        [1684437445608, 1654550170849, 1233, 3, 1, -600, 1300, 16891, 2],
        [1684437453914, 1642625603410, 1233, 3, 33, 25, 1300, 6022, 1],
      ],
      error: null,
    });

    const expected: AnkiCardReview[] = [
      {
        reviewTime: "2023-05-18T19:17:25.608Z",
        cardId: 1654550170849,
        usn: 1233,
        ease: 3,
        newInterval: "P1D",
        previousInterval: "PT600S",
        newFactor: 1300,
        reviewDuration: "PT16.891S",
        reviewType: ReviewType.Relearn,
      },
      {
        reviewTime: "2023-05-18T19:17:33.914Z",
        cardId: 1642625603410,
        usn: 1233,
        ease: 3,
        newInterval: "P33D",
        previousInterval: "P25D",
        newFactor: 1300,
        reviewDuration: "PT6.022S",
        reviewType: ReviewType.Review,
      },
    ];

    const actual = await client.getReviews("test", "2023-05-18T19:17:16.023Z");

    expect(mockFetch).toHaveBeenNthCalledWith(1, ankiUrl, {
      method: "POST",
      body: JSON.stringify({
        action: "cardReviews",
        version: 6,
        key: apiKey,
        params: { deck: "test", startID: 1684437436023 },
      }),
    });
    expect(actual).toEqual(expected);
  });
});
