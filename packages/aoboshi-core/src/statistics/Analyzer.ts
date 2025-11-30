import { AnalysisContext } from "./AnalysisContext";

/** Generates card review statistics */
export interface Analyzer {
  /**
   * Generates statistics from the given context and saves the result to
   * a repository.
   *
   * @param context initial context value or modified context returned from
   * previous analyzer's run method
   * @return updated context passed to the next analyzer
   */
  run: (context: AnalysisContext) => AnalysisContext | void;
}
