import path from "path";
// eslint-disable-next-line import/default
import Bree from "bree";
import { JobName } from "../jobs";
import { OnAfterInit } from "../worker/ApplicationContext";
import { propertiesAsEnv } from "../worker/ApplicationProperties";
import { MainApplicationContext } from "./MainApplicationContext";

/**
 * Runs scheduled background tasks in worker threads.
 */
export class Scheduler implements OnAfterInit {
  private bree: Bree;

  constructor({ properties }: MainApplicationContext) {
    this.bree = new Bree({
      root: path.join(__dirname, "jobs"),
      worker: {
        // Pass application properties to worker threads
        env: propertiesAsEnv(properties),
      },
    });
  }

  async onAfterInit() {
    await this.bree.start();
  }

  async run(job: JobName) {
    await this.bree.run(job);
  }
}
