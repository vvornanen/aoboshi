import { CharacterStatus } from "./CharacterStatus";

const grade1 =
  "一右雨円王音下火花貝学気九休玉金空月犬見五口校左三山子四糸字耳七車手十出女小上森人水正生青夕石赤千川先早草足村大男竹中虫町天田土二日入年白八百文木本名目立力林六";

export const allSeen: CharacterStatus[] = grade1.split("").map((literal) => ({
  literal,
  seen: true,
  highlight: false,
}));

export const allUnseen: CharacterStatus[] = grade1.split("").map((literal) => ({
  literal,
  seen: false,
  highlight: false,
}));

const seen =
  "一右雨円王音下火貝学九空月犬見五口左三山子四字耳七手十出女小上森人水生青千川早村大男中天田土二日入年白八百文木本名目力林六";
const highlighted = "糸校花玉金車町足";

export const someSeenAndHighlighted: CharacterStatus[] = grade1
  .split("")
  .map((literal) => ({
    literal,
    seen: seen.includes(literal),
    highlight: highlighted.includes(literal),
  }));
