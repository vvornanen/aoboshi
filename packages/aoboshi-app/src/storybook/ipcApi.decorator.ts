import { makeDecorator } from "@storybook/preview-api";
import { IPC_API_KEY, IpcApi } from "../preload/IpcApi";
import { mockCharacter } from "../mocks/mockCharacter";

/**
 * Default mock implementation for IpcApi.
 * Individual functions can be overridden in component or story parameters.
 */
const mockApi: IpcApi = {
  onToggleSidebar: () => {},
  toggleSidebar: () => {},
  onNavigate: () => {},
  findBookById: async () => null,
  findAllBooks: async () => [],
  findCharacterByLiteral: async (literal: string) => mockCharacter({ literal }),
};

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
    window[IPC_API_KEY] = {
      ...mockApi,
      ...parameters,
    } satisfies IpcApi;

    return getStory(context);
  },
});
