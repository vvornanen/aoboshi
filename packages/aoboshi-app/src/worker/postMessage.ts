import { isMainThread, parentPort } from "worker_threads";
import { Tag } from "~/preload";

export type InvalidateTagsMessage = { type: "invalidateTags"; tags: Tag[] };

export type ProgressMessage = { type: "progress"; value: number };

export type Message = InvalidateTagsMessage | ProgressMessage;

const isMessage = (message: unknown): message is Message => {
  if (!message || typeof message !== "object" || Array.isArray(message)) {
    return false;
  }

  return "type" in message;
};

export const isInvalidateTagsMessage = (
  message: unknown,
): message is InvalidateTagsMessage =>
  isMessage(message) && message.type === "invalidateTags";

export const isProgressMessage = (
  message: unknown,
): message is ProgressMessage =>
  isMessage(message) && message.type === "progress";

/** Posts a message from a worker thread to the scheduler and the main window */
export const postMessage = (message: Message | "cancelled"): void => {
  if (parentPort && !isMainThread) {
    parentPort.postMessage(message);
  }
};
