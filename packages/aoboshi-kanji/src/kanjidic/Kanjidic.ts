export type KanjidicCodePointValue = {
  "#text": string;
  "@_cp_type": "jis208" | "jis212" | "jis213" | "ucs";
};

export type KanjidicRadicalValue = {
  "#text": number;
  "@_rad_type": "classical" | "nelson_c";
};

export type KanjidicDictionaryReference = {
  "#text": number;
  "@_dr_type": string;
  "@_m_vol"?: string;
  "@_m_page"?: string;
};

export type KanjidicQueryCode = {
  "#text": string | number;
  "@_qc_type": string;
  "@_skip_misclass"?: string;
};

export type KanjidicReading = {
  "#text": string;
  "@_r_type":
    | "pinyin"
    | "korean_r"
    | "korean_h"
    | "vietnam"
    | "ja_on"
    | "ja_kun";
};

export type KanjidicMeaning = string | { "#text": string; "@_m_lang": string };

/**
 * Type definition for fast-xml-parser output of Kanjidic <character> element.
 *
 * @see http://www.edrdg.org/wiki/index.php/KANJIDIC_Project
 */
export type KanjidicCharacter = {
  literal: string;
  codepoint: {
    cp_value: KanjidicCodePointValue[];
  };
  radical: {
    rad_value: KanjidicRadicalValue[];
  };
  misc: {
    grade?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 9 | 10;
    stroke_count?: number;
    freq?: number;
    jlpt?: 1 | 2 | 3 | 4;
  };
  dic_number: {
    dic_ref: KanjidicDictionaryReference[];
  };
  query_code: {
    q_code: KanjidicQueryCode[];
  };
  reading_meaning: {
    rmgroup: {
      reading: KanjidicReading[];
      meaning: KanjidicMeaning[];
    };
    nanori?: string[];
  };
};

/**
 * Type definition for fast-xml-parser output of Kanjidic xml file.
 *
 * @see http://www.edrdg.org/wiki/index.php/KANJIDIC_Project
 */
export type Kanjidic = {
  kanjidic2: {
    header: {
      file_version: number;
      database_version: string;
      date_of_creation: string;
    };
    character: KanjidicCharacter[];
  };
};
