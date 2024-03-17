import { Character } from "@vvornanen/aoboshi-core/characters/Character";
import { ipcApi } from "../app/ipcApi";

/**
 * Redux Toolkit Query API for fetching character information from the database
 * through Electron IPC.
 */
const charactersApi = ipcApi.injectEndpoints({
  endpoints: (build) => ({
    findCharacterByLiteral: build.query<Character | null, string>({
      providesTags: (character) =>
        character ? [{ type: "Character", id: character.literal }] : [],
      queryFn: async (literal) => {
        try {
          return {
            data: await window.ipcApi.findCharacterByLiteral(literal),
          };
        } catch (error) {
          console.error(error);
          return {
            error: `Fetching character '${literal}' failed: ${error}`,
          };
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useFindCharacterByLiteralQuery } = charactersApi;
