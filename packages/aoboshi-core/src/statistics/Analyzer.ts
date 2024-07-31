import { AnalysisContext } from "./AnalysisContext";

/** Generates card review statistics */
export interface Analyzer {
  /**
   * Generates statistics from the given context and saves the result to
   * a repository.
   *
   * @param context
   * @return updated context passed to the next analyzer
   */
  run: (
    context: AnalysisContext,
  ) => AnalysisContext | void | Promise<AnalysisContext> | Promise<void>;
}
