export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      ["anki", "app", "core", "deps", "kanji", "storybook"],
    ],
    "type-enum": [
      2,
      "always",
      [
        "build",
        "change",
        "chore",
        "ci",
        "docs",
        "deprecate",
        "feat",
        "fix",
        "perf",
        "refactor",
        "remove",
        "revert",
        "security",
        "style",
        "test",
      ],
    ],
  },
};
