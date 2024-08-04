import * as dotenv from "dotenv";
import { expect, test } from "vitest";
import { AnkiClient } from "~";

dotenv.config();

test("integration", async () => {
  const client = new AnkiClient(
    process.env.ANKI_URL || "",
    process.env.ANKI_API_KEY || "",
  );

  const imported = await client.importPackage(`${__dirname}/test.apkg`);
  expect(imported).toBeTruthy();

  const allCards = await client.getAllCards("test");
  console.log("findCards", JSON.stringify(allCards, null, 2));
  expect(allCards).toHaveLength(1);

  const cardsByIds = await client.getCards([1684438118818]);
  console.log("getCards", JSON.stringify(cardsByIds, null, 2));
  expect(allCards).toHaveLength(1);

  const notes = await client.getNotes(cardsByIds.map((card) => card.note));
  console.log("getNotes", JSON.stringify(notes, null, 2));
  expect(notes).toHaveLength(1);

  const reviews = await client.getReviews("test", "2023-05-18T19:13:52.547Z");
  console.log("getReviews", JSON.stringify(reviews, null, 2));
  expect(reviews).toHaveLength(2);

  const reviewsInFuture = await client.getReviews(
    "test",
    "2023-05-19T12:00:00.000Z",
  );
  expect(reviewsInFuture).toHaveLength(0);

  await client.deleteDecks(["test"]);
}, 30000);
