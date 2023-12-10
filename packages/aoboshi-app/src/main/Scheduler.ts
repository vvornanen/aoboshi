import path from "path";
// eslint-disable-next-line import/default
import Bree from "bree";
import { OnAfterInit } from "./ApplicationContext";

/**
 * Runs scheduled background tasks in worker threads.
 */
export class Scheduler implements OnAfterInit {
  private bree: Bree;

  constructor() {
    this.bree = new Bree({
      root: path.join(__dirname, "jobs"),
      jobs: [],
    });
  }

  async onAfterInit() {
    await this.bree.start();
  }
}
