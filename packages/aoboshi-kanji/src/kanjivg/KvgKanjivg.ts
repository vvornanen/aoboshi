/**
 * Type definition for fast-xml-parser output of KanjiVG xml file.
 *
 * @see https://kanjivg.tagaini.net/svg-format.html
 */
export type KvgKanjivgFile = [XmlNode, KvgKanjivg];

export type XmlNode = {
  "?xml": [
    {
      "#text": "";
    },
  ];
  ":@": {
    "@_version": "1.0";
    "@_encoding": "UTF-8";
  };
};

export type KvgKanjivg = {
  kanjivg: KvgKanji[];
  ":@": {
    "@_xmlns:kvg": string;
  };
};

export type KvgKanji = {
  kanji: KvgGroup[];
  ":@": {
    "@_id": string;
  };
};

export type KvgGroup = {
  g: (KvgGroup | KvgStroke)[];
  ":@": {
    "@_id": string;
    "@_kvg:element": string;
    "@_kvg:number": string;
    "@_kvg:original"?: string;
    "@_kvg:part"?: string;
    "@_kvg:partial"?: "true";
    "@_kvg:phon"?: string;
    "@_kvg:position"?:
      | "bottom"
      | "kamae"
      | "left"
      | "nyo"
      | "nyoc"
      | "right"
      | "tare"
      | "tarec"
      | "top";
    "@_kvg:radical"?: "general" | "jis" | "tradit" | "nelson";
    "@_kvg:radicalForm"?: "true";
    "@_kvg:tradForm"?: "true";
    "@_kvg:variant"?: "true";
  };
};

export type KvgStroke = {
  path: [];
  ":@": {
    "@id": string;
    "@_d": string;
    "@kvg:type"?: string;
  };
};

export const isGroup = (node: unknown): node is KvgGroup => {
  if (typeof node === "object" && !Array.isArray(node)) {
    return (node as KvgGroup).g !== undefined;
  }

  return false;
};

export const isStroke = (node: unknown): node is KvgStroke => {
  if (typeof node === "object" && !Array.isArray(node)) {
    return (node as KvgStroke).path !== undefined;
  }

  return false;
};
