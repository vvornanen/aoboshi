import { describe, expect, test } from "vitest";
import { Analyzer } from "~/statistics/Analyzer";
import {
  PreProcessingAnalyzer,
  isPreProcessingAnalyzer,
} from "~/statistics/PreProcessingAnalyzer";

class AnalyzerStub implements Analyzer {
  run() {}
}

class PreProcessingAnalyzerStub implements PreProcessingAnalyzer {
  async prepare() {}
  run() {}
}

describe("isPreProcessingAnalyzer", () => {
  test("Analyzer", () => {
    expect(isPreProcessingAnalyzer(new AnalyzerStub())).toBe(false);
  });

  test("PreProcessingAnalyzer", () => {
    expect(isPreProcessingAnalyzer(new PreProcessingAnalyzerStub())).toBe(true);
  });
});
