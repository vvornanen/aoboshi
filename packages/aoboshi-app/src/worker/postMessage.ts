import { parentPort, isMainThread } from "worker_threads";
import { Tag } from "../preload/IpcApi";

export type InvalidateTagsMessage = { type: "invalidateTags"; tags: Tag[] };

export type Message = InvalidateTagsMessage;

export const isInvalidateTagsMessage = (
  message: unknown,
): message is InvalidateTagsMessage => {
  if (!message || typeof message !== "object" || Array.isArray(message)) {
    return false;
  }

  const invalidateTagsMessage = message as InvalidateTagsMessage;

  return (
    invalidateTagsMessage.type === "invalidateTags" &&
    Array.isArray(invalidateTagsMessage.tags)
  );
};

/** Posts a message from a worker thread to the scheduler and the main window */
export const postMessage = (message: Message): void => {
  if (parentPort && !isMainThread) {
    parentPort.postMessage(message);
  }
};
