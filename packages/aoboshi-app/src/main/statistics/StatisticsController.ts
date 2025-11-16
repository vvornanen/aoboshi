import { ipcMain } from "electron";
import { StatisticsIncrementRepository } from "@vvornanen/aoboshi-core/statistics";
import { OnAfterInit } from "~/worker";
import { IpcEventType } from "~/preload";

/**
 * Handles inter-process events from the renderer process.
 * These handlers behave like backend endpoints, hence the name 'controller'.
 */
export class StatisticsController implements OnAfterInit {
  constructor(
    private statisticsIncrementRepository: StatisticsIncrementRepository,
  ) {}

  onAfterInit() {
    ipcMain.handle(IpcEventType.FindLatestStatisticsIncrement, () => {
      return this.statisticsIncrementRepository.findLatest();
    });
  }
}
