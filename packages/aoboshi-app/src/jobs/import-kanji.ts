import path from "path";
import { Character } from "@vvornanen/aoboshi-core/characters/Character";
import { KanjidicReader } from "../../../aoboshi-kanji/src/kanjidic/KanjidicReader";
import { readGzip } from "../main/readGzip";
import { getApplicationContext } from "../main/ApplicationContext";

const applicationContext = getApplicationContext();

const readCharactersFromFile = async (path: string): Promise<Character[]> => {
  console.log(`Extracting file ${path}`);
  const data = await readGzip(path);

  console.log("Reading characters");
  return new KanjidicReader().getCharacters(data);
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
  saveAll(characters);
})();
