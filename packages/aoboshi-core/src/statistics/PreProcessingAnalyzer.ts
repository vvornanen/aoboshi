import type { Analyzer } from "~/statistics/Analyzer";
import type { AnalysisContext } from "~/statistics/AnalysisContext";

/**
 * An {@link Analyzer} with support for asynchronous data loading.
 *
 * Analyzer's `run` method must be synchronous because it is called within a
 * database transaction. Implementing this interface allows asynchronous
 * operations on {@link AnalysisContext} before the actual `run` method is
 * called.
 */
export interface PreProcessingAnalyzer extends Analyzer {
  /**
   * This method is called before running any analyzers.
   *
   * Prepared data should be saved to the context. All database queries
   * should be executed in `run` method.
   *
   * @param context initial context value or modified context returned from
   * previous analyzer's prepare method
   * @return updated context passed to the next analyzer
   */
  prepare: (
    context: AnalysisContext,
  ) => AnalysisContext | void | Promise<AnalysisContext> | Promise<void>;
}

export const isPreProcessingAnalyzer = (
  analyzer: Analyzer,
): analyzer is PreProcessingAnalyzer => {
  return typeof (analyzer as PreProcessingAnalyzer).prepare === "function";
};
