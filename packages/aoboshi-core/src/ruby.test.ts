import { parseRuby } from "./ruby";

test.each([
  { text: "", expected: [] },
  { text: " ", expected: [] },
  { text: "&nbsp;", expected: [] },
  { text: "text", expected: [{ text: "text" }] },
  { text: " text", expected: [{ text: "text" }] },
  { text: "text ", expected: [{ text: "text" }] },
  { text: " text ", expected: [{ text: "text" }] },
  { text: "lorem ipsum", expected: [{ text: "lorem ipsum" }] },
  { text: "<span>text</span>", expected: [{ text: "text" }] },
  { text: "あ", expected: [{ text: "あ" }] },
  { text: "あ　あ", expected: [{ text: "あ　あ" }] },
  { text: "山[やま]", expected: [{ text: "山", rubyText: "やま" }] },
  { text: "山[]", expected: [{ text: "山[]" }] },
  { text: "山[ ]", expected: [{ text: "山[ ]" }] },
  { text: "山[ やま ]", expected: [{ text: "山", rubyText: "やま" }] },
  { text: "[やま]", expected: [{ text: "[やま]" }] },
  { text: "漢字[かんじ]", expected: [{ text: "漢字", rubyText: "かんじ" }] },
  {
    text: "漢[かん]字[じ]",
    expected: [
      { text: "漢", rubyText: "かん" },
      { text: "字", rubyText: "じ" },
    ],
  },
  {
    text: " 漢[かん] 字[じ] ",
    expected: [
      { text: "漢", rubyText: "かん" },
      { text: "字", rubyText: "じ" },
    ],
  },
  {
    text: "引越[ひっこ]し",
    expected: [{ text: "引越", rubyText: "ひっこ" }, { text: "し" }],
  },
  {
    text: "持[も]ち 込[こ]む",
    expected: [
      { text: "持", rubyText: "も" },
      { text: "ち" },
      { text: "込", rubyText: "こ" },
      { text: "む" },
    ],
  },
  {
    text: "持[も]ち　込[こ]む",
    expected: [
      { text: "持", rubyText: "も" },
      { text: "ち" },
      { text: "込", rubyText: "こ" },
      { text: "む" },
    ],
  },
  {
    text: "持[も]ち と 込[こ]む",
    expected: [
      { text: "持", rubyText: "も" },
      { text: "ち と" },
      { text: "込", rubyText: "こ" },
      { text: "む" },
    ],
  },
])("parseRuby %j", ({ text, expected }) => {
  expect(parseRuby(text)).toEqual(expected);
});
