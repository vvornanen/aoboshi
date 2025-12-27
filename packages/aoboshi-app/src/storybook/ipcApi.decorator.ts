import { makeDecorator } from "storybook/preview-api";
import { mockIpcApi } from "./mockIpcApi";

/**
 * Storybook decorator for mocking {@link IpcApi}.
 *
 * Behavior can be overridden by passing custom mock functions in component
 * or story parameters.
 *
 * Example:
 * ```
 * const Story = {
 *   ...
 *   parameters: {
 *       ipcApi: {
 *         findAllBooks: async () => [],
 *       } satisfies Partial<IpcApi>,
 *     },
 * };
 * ```
 */
export const withIpcApi = makeDecorator({
  name: "withIpcApi",
  parameterName: "ipcApi",
  wrapper: (getStory, context, { parameters }) => {
    mockIpcApi(parameters);
    return getStory(context);
  },
});
