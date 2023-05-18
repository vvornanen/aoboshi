import { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  rootDir: ".",
  testEnvironment: "node",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  projects: [
    {
      displayName: "aoboshi-anki",
      testEnvironment: "node",
      transform: {
        "^.+\\.ts$": [
          "ts-jest",
          {
            isolatedModules: true,
          },
        ],
      },
      testMatch: ["<rootDir>/packages/aoboshi-anki/src/**/*.test.ts"],
    },
  ],
};

export default config;
