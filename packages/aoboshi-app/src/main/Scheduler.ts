import path from "path";
import Bree from "bree"; // eslint-disable-line import/default, import/no-named-as-default, import/no-named-as-default-member
import { MainApplicationContext } from "~/main";
import {
  OnAfterInit,
  isInvalidateTagsMessage,
  isProgressMessage,
  propertiesAsEnv,
} from "~/worker";
import { IpcEventType } from "~/preload";
import { JobName } from "~/jobs";

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
        } else if (isProgressMessage(message)) {
          context.mainWindow.setProgress(message.value);
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
