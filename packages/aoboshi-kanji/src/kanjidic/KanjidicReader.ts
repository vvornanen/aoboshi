import { XMLParser } from "fast-xml-parser";
import { Character } from "@vvornanen/aoboshi-core/characters";
import { Kanjidic, KanjidicCharacter, KanjidicReading } from "./Kanjidic";

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

    return kanjidic.kanjidic2.character.map((kanjidicCharacter) => {
      try {
        return this.toCharacter(kanjidicCharacter);
      } catch (error) {
        console.error(error);
        throw new Error(
          `Error in reading character [${kanjidicCharacter.literal}]: ${error}`,
        );
      }
    });
  }

  private toCharacter(kanjidicCharacter: KanjidicCharacter): Character {
    let strokeCount: number;

    if (kanjidicCharacter.misc.stroke_count === undefined) {
      strokeCount = 0;
    } else if (Array.isArray(kanjidicCharacter.misc.stroke_count)) {
      strokeCount = kanjidicCharacter.misc.stroke_count[0];
    } else {
      strokeCount = kanjidicCharacter.misc.stroke_count;
    }

    let readings: KanjidicReading[];
    if (kanjidicCharacter.reading_meaning?.rmgroup?.reading === undefined) {
      readings = [];
    } else if (
      Array.isArray(kanjidicCharacter.reading_meaning.rmgroup.reading)
    ) {
      readings = kanjidicCharacter.reading_meaning.rmgroup.reading;
    } else {
      readings = [kanjidicCharacter.reading_meaning.rmgroup.reading];
    }

    return {
      literal: kanjidicCharacter.literal,
      radical: null,
      grade: kanjidicCharacter.misc.grade || null,
      references: [],
      strokeCount,
      onyomi: readings
        .filter((reading) => reading["@_r_type"] === "ja_on")
        .map((reading) => reading["#text"]),
      kunyomi: readings
        .filter((reading) => reading["@_r_type"] === "ja_kun")
        .map((reading) => reading["#text"]),
    };
  }
}
