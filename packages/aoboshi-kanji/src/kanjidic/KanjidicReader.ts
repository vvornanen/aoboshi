import { XMLParser } from "fast-xml-parser";
import { Character } from "@vvornanen/aoboshi-core/characters/Character";
import { Kanjidic, KanjidicCharacter } from "./Kanjidic";

/**
 * Reads character information from Kanjidic xml data.
 */
export class KanjidicReader {
  /**
   * Parses characters from Kanjidic xml data.
   *
   * @param xmlData Kanjidic xml
   */
  getCharacters(xmlData: string | Buffer): Character[] {
    const parser = new XMLParser({ ignoreAttributes: false });
    const kanjidic = parser.parse(xmlData) as Kanjidic;

    return kanjidic.kanjidic2.character.map((kanjidicCharacter) =>
      this.toCharacter(kanjidicCharacter),
    );
  }

  private toCharacter(kanjidicCharacter: KanjidicCharacter): Character {
    return {
      literal: kanjidicCharacter.literal,
      radical: null,
      grade: kanjidicCharacter.misc.grade || null,
      references: [],
      strokeCount: kanjidicCharacter.misc.stroke_count || 0,
      onyomi: kanjidicCharacter.reading_meaning.rmgroup.reading
        .filter((reading) => reading["@_r_type"] === "ja_on")
        .map((reading) => reading["#text"]),
      kunyomi: kanjidicCharacter.reading_meaning.rmgroup.reading
        .filter((reading) => reading["@_r_type"] === "ja_kun")
        .map((reading) => reading["#text"]),
    };
  }
}
