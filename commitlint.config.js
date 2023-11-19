module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      ["anki", "app", "core", "deps", "kanji", "storybook"],
    ],
  },
};
