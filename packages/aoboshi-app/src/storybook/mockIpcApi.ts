import { createCharacter } from "@vvornanen/aoboshi-core/fixtures/createCharacter";
import { IPC_API_KEY, IpcApi } from "~/preload";

/**
 * Default mock implementation for IpcApi.
 * Individual functions can be overridden in component or story parameters.
 */
const defaultMockApi: IpcApi = {
  onToggleSidebar: () => {},
  toggleSidebar: () => {},
  onNavigate: () => {},
  onInvalidateTags: () => {},
  onSearch: () => {},
  findBookById: async () => null,
  findAllBooks: async () => [],
  findCharacterByLiteral: async (literal: string) =>
    createCharacter({ literal }),
  findLatestStatisticsIncrement: async () => null,
};

/**
 * Mocks IpcApi for Storybook.
 *
 * Substitutes a global set in the preload when the app is run inside Electron.
 *
 * @param mockApi pass partial API implementation to override the default mock
 * implementation in stories.
 * @see withIpcApi
 */
export const mockIpcApi = (mockApi: Partial<IpcApi> = {}) => {
  window[IPC_API_KEY] = {
    ...defaultMockApi,
    ...mockApi,
  } satisfies IpcApi;
};
