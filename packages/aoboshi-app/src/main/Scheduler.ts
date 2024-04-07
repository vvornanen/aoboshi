import path from "path";
import Bree from "bree"; // eslint-disable-line import/default, import/no-named-as-default, import/no-named-as-default-member
import { JobName } from "../jobs";
import { OnAfterInit } from "../worker/ApplicationContext";
import { propertiesAsEnv } from "../worker/ApplicationProperties";
import { IpcEventType } from "../preload/IpcApi";
import { isInvalidateTagsMessage } from "../worker/postMessage";
import { MainApplicationContext } from "./MainApplicationContext";

type WorkerMessage = {
  name: JobName;
  message: unknown;
};

/**
 * Runs scheduled background tasks in worker threads.
 */
export class Scheduler implements OnAfterInit {
  private bree: Bree;

  constructor(context: MainApplicationContext) {
    this.bree = new Bree({
      root: path.join(__dirname, "jobs"),
      worker: {
        // Pass application properties to worker threads
        env: propertiesAsEnv(context.properties),
      },
      workerMessageHandler: ({ message }: WorkerMessage) => {
        if (isInvalidateTagsMessage(message)) {
          context.mainWindow.send(IpcEventType.InvalidateTags, message.tags);
        }
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
