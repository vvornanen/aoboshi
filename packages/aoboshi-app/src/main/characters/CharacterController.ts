import { ipcMain } from "electron";
import { CharacterRepository } from "@vvornanen/aoboshi-core/characters";
import { OnAfterInit } from "~/worker";
import { IpcEventType } from "~/preload";

/**
 * Handles inter-process events from the renderer process.
 * These handlers behave like backend endpoints, hence the name 'controller'.
 */
export class CharacterController implements OnAfterInit {
  constructor(private characterRepository: CharacterRepository) {}

  onAfterInit() {
    ipcMain.handle(
      IpcEventType.FindCharacterByLiteral,
      (_, literal: string) => {
        return this.characterRepository.findByLiteral(literal);
      },
    );
  }
}
