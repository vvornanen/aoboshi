import { createCharacter } from "./createCharacter";
import { Character, Grade } from "~/characters";

export const characterFixtures = {
  ["学"]: createCharacter({
    literal: "学",
    radical: "子",
    grade: Grade.Kyoiku1,
    strokeCount: 8,
    references: [
      {
        bookId: "1",
        chapterId: "1",
        chapterCode: "N5",
      },
      {
        bookId: "2",
        chapterId: "2",
        chapterCode: "BKB-2",
      },
      {
        bookId: "3",
        chapterId: "3",
        chapterCode: "REF",
      },
    ],
    onyomi: ["ガク"],
    kunyomi: ["まな.ぶ"],
    strokes:
      '<?xml version="1.0" encoding="UTF-8"?><svg width="109" height="109" viewBox="0 0 109 109" xmlns="http://www.w3.org/2000/svg" xmlns:kvg="http://kanjivg.tagaini.net"><g id="kvg:05b66" kvg:element="学"><g id="kvg:05b66-g1" kvg:position="top" kvg:phon="𦥯"><g id="kvg:05b66-g2" kvg:element="⺍" kvg:original="つ"><path id="kvg:05b66-s1" kvg:type="㇔" d="M29.5,17.25c3.5,3,6.5,7.25,7.75,9.75"/><path id="kvg:05b66-s2" kvg:type="㇔" d="M49,12c1.25,2,4.75,8.25,5.25,11.5"/><path id="kvg:05b66-s3" kvg:type="㇒" d="M75,11c0.25,1.75-0.12,2.75-0.75,4.25c-1.29,3.1-4.25,7.38-6.5,9.75"/></g><g id="kvg:05b66-g3" kvg:element="冖"><path id="kvg:05b66-s4" kvg:type="㇔" d="M21.25,33.75c-0.12,4.75-2,12.5-3.75,16.25"/><path id="kvg:05b66-s5" kvg:type="㇖b" d="M23.5,36.5c17-1.62,42.38-5.5,60-5.75c9.5-0.13,4.12,5.12,0,9"/></g></g><g id="kvg:05b66-g4" kvg:element="子" kvg:position="bottom" kvg:radical="general"><path id="kvg:05b66-s6" kvg:type="㇖" d="M37.25,46.5c1,0.25,3.75,0.25,5.5-0.25s18.25-4,20-4s2.75,0.75,1,2.25S54.5,53.5,53,54.75"/><path id="kvg:05b66-s7" kvg:type="㇁" d="M50.75,55.75c4,8.75,7.18,24.67,1.75,38c-2.75,6.75-7.75,1.25-9.75-2"/><path id="kvg:05b66-s8" kvg:type="㇐" d="M15.75,67.75c1.75,1,4.64,1.36,7.5,1c15.88-2,44.43-6.25,61.37-5.5c2.5,0.11,4.72,0.25,6.39,1"/></g></g></svg>',
  }),
  ["代"]: createCharacter({
    literal: "代",
    radical: "亻",
    grade: Grade.Kyoiku3,
    strokeCount: 5,
    references: [
      {
        bookId: "1",
        chapterId: "1",
        chapterCode: "N4",
      },
      {
        bookId: "2",
        chapterId: "2",
        chapterCode: "BKB-37",
      },
    ],
    onyomi: ["ダイ", "タイ"],
    kunyomi: [
      "か.わる",
      "かわ.る",
      "かわ.り",
      "か.わり",
      "-がわ.り",
      "-が.わり",
      "か.える",
      "よ",
      "しろ",
    ],
    strokes:
      '<?xml version="1.0" encoding="UTF-8"?><svg width="109" height="109" viewBox="0 0 109 109" xmlns="http://www.w3.org/2000/svg" xmlns:kvg="http://kanjivg.tagaini.net"><g id="kvg:04ee3" kvg:element="代"><g id="kvg:04ee3-g1" kvg:element="亻" kvg:variant="true" kvg:original="人" kvg:position="left" kvg:radical="general"><path id="kvg:04ee3-s1" kvg:type="㇒" d="M29.76,22.5c0.21,1.94-0.06,4.48-0.74,6.15c-4.36,10.6-8.54,20.07-18.52,32.98"/><path id="kvg:04ee3-s2" kvg:type="㇑" d="M24.38,45c1.25,1.25,1.76,3.12,1.76,4.48c0,10.42-0.02,28.67-0.02,39.27c0,2.64,0,4.8,0,6.25"/></g><g id="kvg:04ee3-g2" kvg:element="弋" kvg:position="right" kvg:phon="弋"><path id="kvg:04ee3-s3" kvg:type="㇐" d="M39.49,44.11c2.64,0.64,5.3,0.4,7.92-0.19c7.24-1.62,22.53-6.21,33.48-8.44c2.26-0.46,4.98-0.86,7.31-0.31"/><path id="kvg:04ee3-s4" kvg:type="㇂" d="M53.19,13.5c1.94,1.7,2.83,3.16,3.15,6.82C58.75,48.12,70,79.88,91.96,92.8c7.28,4.29,6.29,0.98,5.32-6.54"/><g id="kvg:04ee3-g3" kvg:element="丶"><path id="kvg:04ee3-s5" kvg:type="㇔" d="M71.75,15.38c3.44,1.47,8.94,4.82,10.55,7.33"/></g></g></g></svg>',
  }),
  ["鶴"]: createCharacter({
    literal: "鶴",
    radical: "鳥",
    grade: Grade.Joyo,
    strokeCount: 21,
    references: [
      {
        bookId: "1",
        chapterId: "1",
        chapterCode: "N1",
      },
    ],
    onyomi: ["カク"],
    kunyomi: ["つる"],
    strokes:
      '<?xml version="1.0" encoding="UTF-8"?><svg width="109" height="109" viewBox="0 0 109 109" xmlns="http://www.w3.org/2000/svg" xmlns:kvg="http://kanjivg.tagaini.net"><g id="kvg:09db4" kvg:element="鶴"><g id="kvg:09db4-g1" kvg:element="寉" kvg:variant="true" kvg:position="left"><g id="kvg:09db4-g2" kvg:element="宀" kvg:partial="true" kvg:position="top"><g id="kvg:09db4-g3" kvg:element="冖"><path id="kvg:09db4-s1" kvg:type="㇔" d="M15.4,26.62c0,3.25-1.6,12.19-2.32,14.36"/><path id="kvg:09db4-s2" kvg:type="㇖b" d="M16.96,28.09c7.79-1.34,23.89-3.85,28.93-4.16c7.87-0.49,1.67,6-0.29,7.77"/></g></g><g id="kvg:09db4-g4" kvg:element="隹" kvg:position="bottom"><g id="kvg:09db4-g5" kvg:element="亻" kvg:variant="true" kvg:original="人"><path id="kvg:09db4-s3" kvg:type="㇒" d="M32.83,12.25c0.55,1.38,0.48,2.38,0.05,4.57C30.22,30.16,24.68,47.43,14,61.37"/><path id="kvg:09db4-s4" kvg:type="㇑" d="M21.98,51.47c0.77,0.77,1,2.17,1,3.78c0,10.14-0.02,35.68-0.02,40.75"/></g><path id="kvg:09db4-s5" kvg:type="㇒" d="M40.17,37.21c0.04,0.6-0.01,1.38-0.16,1.89c-0.92,3.26-1.59,4.28-3.71,8.25"/><path id="kvg:09db4-s6" kvg:type="㇐b" d="M22.73,51.45c4.24-0.61,15.61-1.82,22.28-2.6c2.39-0.28,4.17-0.5,4.82-0.62"/><path id="kvg:09db4-s7" kvg:type="㇑a" d="M36.46,51.25c0.9,0.9,1.05,2.13,1.05,3.99c0,8.38,0.05,23.97,0.05,30.63"/><path id="kvg:09db4-s8" kvg:type="㇐b" d="M23.75,62.8c3.85-0.49,13.12-1.41,19-2.03c2.4-0.25,4.24-0.46,4.91-0.57"/><path id="kvg:09db4-s9" kvg:type="㇐b" d="M23.09,74.47c4.05-0.41,13.41-1.62,19.42-2.41c2.49-0.33,4.4-0.58,5.12-0.67"/><path id="kvg:09db4-s10" kvg:type="㇐b" d="M23.34,88.93c4.06-0.59,14.21-1.81,20.68-2.63c2.69-0.34,4.75-0.62,5.48-0.75"/></g></g><g id="kvg:09db4-g6" kvg:element="鳥" kvg:position="right" kvg:radical="general"><path id="kvg:09db4-s11" kvg:type="㇒" d="M69.29,11.41c0.06,0.82-0.06,1.63-0.35,2.4c-0.94,2.44-2.18,4.81-4.69,8.07"/><path id="kvg:09db4-s12" kvg:type="㇑" d="M57.8,22.92c1.01,1.01,1.09,2.33,1.09,4.58c0,7.62,0.06,23.9,0.08,36.62c0,2.24,0,5.15,0,7.16"/><path id="kvg:09db4-s13" kvg:type="㇕a" d="M59.81,24.25c2.94-0.62,21.5-3.17,23.01-3.06c2.24,0.16,3.33,2.15,3.13,4.02c-0.09,0.89-1.67,9.77-3.02,16.23c-0.39,1.86-0.76,3.52-1.06,4.73"/><path id="kvg:09db4-s14" kvg:type="㇐a" d="M60.31,34.58c7.94-1.21,19.31-2.46,23.25-2.84"/><path id="kvg:09db4-s15" kvg:type="㇐a" d="M59.97,46.37c5.15-0.62,15.28-1.87,21.13-2.25"/><path id="kvg:09db4-s16" kvg:type="㇐b" d="M60.19,58.36c7.09-0.73,21.06-2.15,26.95-2.86c1.75-0.21,4.34-1.05,6.02-0.38"/><path id="kvg:09db4-s17" kvg:type="㇆a" d="M59.99,70c10.63-1.5,27.13-3.67,32.17-4.15c3.28-0.31,4.97,0.89,4.38,4.57c-1.64,10.24-3.83,17.71-6.68,24c-2.86,6.33-5.97,1.04-7.3-0.24"/><g id="kvg:09db4-g7" kvg:element="灬" kvg:variant="true" kvg:original="火"><path id="kvg:09db4-s18" kvg:type="㇔" d="M55.02,82.98c0.4,3.71-0.54,8.16-1.71,10.44"/><path id="kvg:09db4-s19" kvg:type="㇔" d="M62.32,79.74c1.84,1.84,3.58,6.67,4.04,9.37"/><path id="kvg:09db4-s20" kvg:type="㇔" d="M71.33,77.79c1.56,1.42,4.03,5.68,4.42,7.76"/><path id="kvg:09db4-s21" kvg:type="㇔" d="M79.75,75.75c1.86,1.3,4.8,5.21,5.27,7.12"/></g></g></g></svg>',
  }),
  ["伊"]: createCharacter({
    literal: "伊",
    radical: "亻",
    grade: Grade.Jinmeiyo,
    strokeCount: 6,
    references: [
      {
        bookId: "1",
        chapterId: "1",
        chapterCode: "N1",
      },
      {
        bookId: "2",
        chapterId: "2",
        chapterCode: "IKB2-コ5",
      },
    ],
    onyomi: ["イ"],
    kunyomi: ["かれ"],
    strokes:
      '<?xml version="1.0" encoding="UTF-8"?><svg width="109" height="109" viewBox="0 0 109 109" xmlns="http://www.w3.org/2000/svg" xmlns:kvg="http://kanjivg.tagaini.net"><g id="kvg:04f0a" kvg:element="伊"><g id="kvg:04f0a-g1" kvg:element="亻" kvg:variant="true" kvg:original="人" kvg:position="left" kvg:radical="general"><path id="kvg:04f0a-s1" kvg:type="㇒" d="M32.75,15.64c0.13,1.23-0.03,2.53-0.36,4.04C30.25,29.25,21.25,47,11.31,59.97"/><path id="kvg:04f0a-s2" kvg:type="㇑" d="M25.53,41.5c0.98,0.98,1.01,2,1.01,3.73c0,10.59-0.03,29.34-0.04,41.52c0,2.8,0,5.23,0,7.12"/></g><g id="kvg:04f0a-g2" kvg:element="尹" kvg:position="right"><g id="kvg:04f0a-g3" kvg:element="⺕" kvg:variant="true" kvg:original="彑"><g id="kvg:04f0a-g4" kvg:element="尸" kvg:part="1"><path id="kvg:04f0a-s3" kvg:type="㇕c" d="M44.21,21.32c2.46,1.04,5.71,1.07,8.3,0.64c9.06-1.52,20.88-3.54,28.36-4.46c2.43-0.3,4.14,1.28,3.77,3.84c-0.99,6.7-2.63,23.06-3.95,34.59"/><path id="kvg:04f0a-s4" kvg:type="㇐" d="M36.9,42.6c2.91,1.07,6.25,0.8,9.23,0.29c14.3-2.47,30.47-4.95,42.75-5.9c3.43-0.26,5.95-0.1,9.23,0.74"/></g><path id="kvg:04f0a-s5" kvg:type="㇐" d="M42.9,62.05c2.86,0.73,4.95,0.64,7.86,0.02c9.24-1.95,18.12-3.14,26.25-4c2.7-0.28,5.54-0.67,8.23-0.1"/></g><g id="kvg:04f0a-g5" kvg:element="尸" kvg:part="2"><g id="kvg:04f0a-g6" kvg:element="丿"><path id="kvg:04f0a-s6" kvg:type="㇒" d="M60.66,27.6c0.59,1.03,0.91,2.38,0.94,3.47c0.9,37.43-3.85,51.18-13.68,62.43"/></g></g></g></g></svg>',
  }),
  ["あ"]: createCharacter({
    literal: "あ",
    strokeCount: 3,
    strokes:
      '<?xml version="1.0" encoding="UTF-8"?><svg width="109" height="109" viewBox="0 0 109 109" xmlns="http://www.w3.org/2000/svg" xmlns:kvg="http://kanjivg.tagaini.net"><g id="kvg:03042" kvg:element="あ"><path id="kvg:03042-s1" d="M31.01,33c0.88,0.88,2.75,1.82,5.25,1.75c8.62-0.25,20-2.12,29.5-4.25c1.51-0.34,4.62-0.88,6.62-0.5"/><path id="kvg:03042-s2" d="M49.76,17.62c0.88,1,1.82,3.26,1.38,5.25c-3.75,16.75-6.25,38.13-5.13,53.63c0.41,5.7,1.88,10.88,3.38,13.62"/><path id="kvg:03042-s3" d="M65.63,44.12c0.75,1.12,1.16,4.39,0.5,6.12c-4.62,12.26-11.24,23.76-25.37,35.76c-6.86,5.83-15.88,3.75-16.25-8.38c-0.34-10.87,13.38-23.12,32.38-26.74c12.42-2.37,27,1.38,30.5,12.75c4.05,13.18-3.76,26.37-20.88,30.49"/></g></svg>',
  }),
  empty: createCharacter({ literal: "" }),
} satisfies Record<string, Character>;
