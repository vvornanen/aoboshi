import path from "path";
import { Character } from "@vvornanen/aoboshi-core/characters/Character";
import { KanjidicReader } from "@vvornanen/aoboshi-kanji/kanjidic/KanjidicReader";
import { Chapter } from "@vvornanen/aoboshi-core/books/Book";
import { readGzip } from "../worker/readGzip";
import { getApplicationContext } from "../worker/ApplicationContext";
import { gradesBookId } from "../worker/books/books";

const applicationContext = getApplicationContext();

const readCharactersFromFile = async (path: string): Promise<Character[]> => {
  console.log(`Extracting file ${path}`);
  const data = await readGzip(path);

  console.log("Reading characters");
  return new KanjidicReader().getCharacters(data);
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

(async () => {
  const characters = await readCharactersFromFile(
    path.join(applicationContext.properties.resourcesPath, "kanjidic2.xml.gz"),
  );
  saveAll(withRevisedGrades(characters));
})();
