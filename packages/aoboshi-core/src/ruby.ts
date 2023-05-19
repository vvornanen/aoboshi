export type Ruby = {
  text: string;
  rubyText?: string;
};

/**
 * Parses furigana from the bracket syntax used by Anki Japanese Support addon.
 *
 * The addon uses a special bracket syntax in the reading field. After every
 * word, the reading is defined inside brackets, followed by a space.
 * Example: `折[お]り 紙[がみ]`
 *
 * @param reading text in the bracket syntax
 * @return array of tokens containing the text and the reading
 * @see https://ankiweb.net/shared/info/3918629684
 */
export const parseRuby = (reading: string): Ruby[] => {
  const matches = reading
    .replace(/<[^>]+>/gm, "") // replace tags. e.g. <span> and <br>
    .replace("&nbsp;", " ")
    .trim()
    .matchAll(/([^[]+)?(\[([^\]]*)])?/g);

  return [...matches]
    .map(([original, text, , rubyText]) => {
      if (!text) {
        return [{ text: original }];
      } else if (!(rubyText || "").trim()) {
        return [{ text: original }];
      }

      // If the text contains spaces, attach the ruby text only to the last
      // element
      const containsSpace = text.match(/(.*)\s(.*)/);
      if (containsSpace) {
        return [
          { text: containsSpace[1] },
          { text: containsSpace[2], rubyText: rubyText.trim() },
        ];
      }

      return [{ text: text.trim(), rubyText: rubyText.trim() }];
    })
    .flat()
    .filter((ruby) => Boolean(ruby.text));
};
