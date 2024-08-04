import { Character } from "@vvornanen/aoboshi-core/characters";
import { IpcApiErrorCode, ipcApi } from "~app/ipcApi";

/**
 * Redux Toolkit Query API for fetching character information from the database
 * through Electron IPC.
 */
const charactersApi = ipcApi.injectEndpoints({
  endpoints: (build) => ({
    findCharacterByLiteral: build.query<Character, string>({
      providesTags: (_result, _error, literal) => [
        { type: "Character", id: literal },
      ],
      queryFn: async (literal) => {
        try {
          const data = await window.ipcApi.findCharacterByLiteral(literal);

          if (!data) {
            return {
              error: {
                code: IpcApiErrorCode.NotFound,
                message: `Character '${literal}' not found`,
              },
            };
          }

          return { data };
        } catch (error) {
          console.error(error);
          return {
            error: {
              code: IpcApiErrorCode.InternalServerError,
              message: `Fetching character '${literal}' failed: ${error}`,
            },
          };
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useFindCharacterByLiteralQuery } = charactersApi;
