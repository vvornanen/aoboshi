import path from "path";
import {
  Character,
  CharacterUpdateValue,
} from "@vvornanen/aoboshi-core/characters";
import { KanjidicReader } from "@vvornanen/aoboshi-kanji/kanjidic";
import { Chapter } from "@vvornanen/aoboshi-core/books";
import { KanjivgReader } from "@vvornanen/aoboshi-kanji/kanjivg";
import { getApplicationContext, postMessage, readGzip } from "~/worker";
import { gradesBookId } from "~/worker/books";

const applicationContext = getApplicationContext();

const readCharactersFromFile = async (path: string): Promise<Character[]> => {
  console.log(`Extracting file ${path}`);
  const data = await readGzip(path);

  console.log("Reading characters");
  return new KanjidicReader().getCharacters(data);
};

const readStrokesFromFile = async (
  path: string,
): Promise<CharacterUpdateValue[]> => {
  console.log(`Extracting file ${path}`);
  const data = await readGzip(path);

  console.log("Reading stroke information");
  return new KanjivgReader().getStrokes(data);
};

/**
 * Kanjidic contains outdated grade information, so use current data from the grades book in the database
 *
 * @param characters characters read from kanjidic
 * @return characters with grades based on grades book in the database
 */
const withRevisedGrades = (characters: Character[]) => {
  const grades = applicationContext.bookRepository.findById(gradesBookId);

  if (!grades) {
    throw new Error("Grades book not found");
  }

  const findChapterByCharacter = (literal: string): Chapter | null => {
    for (const volume of grades.volumes) {
      for (const chapter of volume.chapters) {
        if (Array.isArray(chapter.characters)) {
          if (
            chapter.characters.find(
              (character) => character.literal === literal,
            )
          ) {
            return chapter;
          }
        } else if (chapter.characters.includes(literal)) {
          return chapter;
        }
      }
    }

    return null;
  };

  const getGrade = (literal: string): number | null => {
    const chapter = findChapterByCharacter(literal);
    return chapter ? Number(chapter.code) : null;
  };

  return characters.map((character) => {
    const grade = getGrade(character.literal);

    if (character.grade !== grade) {
      console.log(
        `Revised kanjidic grade of [${character.literal}] from ${character.grade} to ${grade}`,
      );
    }

    return { ...character, grade };
  });
};

const saveAll = applicationContext.database.transaction(
  (characters: Character[]) => {
    console.log(`Saving ${characters.length} characters`);
    applicationContext.characterRepository.saveAll(characters);
  },
);

const updateAll = applicationContext.database.transaction(
  (characters: CharacterUpdateValue[]) => {
    characters.forEach((character) => {
      const existing = applicationContext.characterRepository.findByLiteral(
        character.literal,
      );

      if (existing) {
        applicationContext.characterRepository.save({
          ...existing,
          ...character,
        });
      } else {
        applicationContext.characterRepository.save({
          radical: null,
          grade: null,
          strokeCount: 0,
          references: [],
          onyomi: [],
          kunyomi: [],
          ...character,
        });
      }
    });
  },
);

(async () => {
  const characters = await readCharactersFromFile(
    path.join(applicationContext.properties.resourcesPath, "kanjidic2.xml.gz"),
  );
  saveAll(withRevisedGrades(characters));

  const strokes = await readStrokesFromFile(
    path.join(applicationContext.properties.resourcesPath, "kanjivg.xml.gz"),
  );
  updateAll(strokes);

  postMessage({ type: "invalidateTags", tags: ["Character"] });
})();
