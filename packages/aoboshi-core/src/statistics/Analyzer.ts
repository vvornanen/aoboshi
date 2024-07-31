import { AnalysisContext } from "./AnalysisContext";

export interface Analyzer {
  run: (
    context: AnalysisContext,
  ) => AnalysisContext | void | Promise<AnalysisContext> | Promise<void>;
}
