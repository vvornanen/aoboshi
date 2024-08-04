import { XMLBuilder, XMLParser, XmlBuilderOptions } from "fast-xml-parser";
import { CharacterUpdateValue } from "@vvornanen/aoboshi-core/characters";
import { KvgGroup, KvgKanjivgFile, isGroup, isStroke } from "./KvgKanjivg";

type Radicals = {
  general?: string;
  jis?: string;
  tradit?: string;
  nelson?: string;
};

const getRadicals = (node: KvgGroup): Radicals => {
  const result: Radicals = {};

  if (node[":@"]["@_kvg:radical"]) {
    result[node[":@"]["@_kvg:radical"]] = node[":@"]["@_kvg:element"];
  }

  return node.g.reduce((acc, current) => {
    if (isGroup(current)) {
      return {
        ...acc,
        ...getRadicals(current),
      };
    } else {
      return acc;
    }
  }, result);
};

const countStrokes = (groupnode: KvgGroup): number => {
  return groupnode.g.reduce((count, node) => {
    if (isStroke(node)) {
      return count + 1;
    } else {
      return count + countStrokes(node);
    }
  }, 0);
};

/** Reads character stroke information from KanjiVG xml data */
export class KanjivgReader {
  getStrokes(xmlData: string | Buffer): CharacterUpdateValue[] {
    const options: XmlBuilderOptions = {
      ignoreAttributes: false,
      preserveOrder: true,
      suppressEmptyNode: true,
    };

    const parser = new XMLParser(options);
    const builder = new XMLBuilder(options);

    const [xmlNode, rootNode] = parser.parse(xmlData) as KvgKanjivgFile;

    return rootNode.kanjivg.map((kanjiNode) => {
      const [groupNode] = kanjiNode.kanji;

      const svg = {
        svg: [groupNode],
        ":@": {
          "@_width": 109,
          "@_height": 109,
          "@_viewBox": "0 0 109 109",
          "@_xmlns": "http://www.w3.org/2000/svg",
          "@_xmlns:kvg": rootNode[":@"]["@_xmlns:kvg"],
        },
      };

      const radicals = getRadicals(groupNode);

      return {
        literal: groupNode[":@"]["@_kvg:element"],
        radical:
          radicals.general ||
          radicals.jis ||
          radicals.tradit ||
          radicals.nelson ||
          null,
        strokeCount: countStrokes(groupNode),
        strokes: builder.build([xmlNode, svg]),
      };
    });
  }
}
