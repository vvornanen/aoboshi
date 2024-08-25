import { isMainThread, threadId } from "node:worker_threads";
import { Temporal } from "@js-temporal/polyfill";

export class Logger {
  private readonly timeZone = Temporal.Now.timeZoneId();
  private readonly loggerName: string;
  private logLevel = "info";

  constructor(loggerName?: string) {
    if (loggerName) {
      this.loggerName = loggerName;
    } else if (isMainThread) {
      this.loggerName = "main";
    } else {
      this.loggerName = String(threadId);
    }
  }

  setLogLevel(logLevel: string) {
    this.logLevel = logLevel.toLowerCase();
  }

  error(message: string) {
    this.log("ERROR", message);
  }

  info(message: string) {
    this.log("INFO", message);
  }

  debug(message: string) {
    if (["debug", "trace"].includes(this.logLevel)) {
      this.log("DEBUG", message);
    }
  }

  private log(level: "DEBUG" | "INFO" | "ERROR", message: string) {
    console.log(
      `${Temporal.Now.instant().toString({
        smallestUnit: "millisecond",
        timeZone: this.timeZone,
      })} [${this.loggerName}] ${level}: ${message}`,
    );
  }
}
