import { Book } from "@vvornanen/aoboshi-core/books/Book";
import { Character } from "@vvornanen/aoboshi-core/characters/Character";

export const IPC_API_KEY = "ipcApi";

export enum IpcEventType {
  ToggleSidebar = "sidebar:toggle",
  Navigate = "navigate",
  InvalidateTags = "invalidateTags",
  FindBookById = "books:findById",
  FindAllBooks = "books:findAll",
  FindCharacterByLiteral = "characters:findByLiteral",
}

/**
 * Called when the sidebar is toggled from the main process (e.g. application menu)
 *
 * @param open true if the sidebar should be opened
 */
export type OnToggleSidebarHandler = (open: boolean) => void;

/**
 * Called when navigation is triggered from the main process (e.g. application menu)
 *
 * @param to router path where to navigate
 */
export type OnNavigateHandler = (to: string) => void;

/**
 * Tag types used for Redux Toolkit Query automated re-fetching.
 *
 * @see https://redux-toolkit.js.org/rtk-query/usage/automated-refetching
 */
export const tagTypes = ["Book", "Character"] as const;

export type TagType = (typeof tagTypes)[number];

export type Tag = TagType | { type: TagType; id?: string };

export type OnInvalidateTagsHandler = (tags: Tag[]) => void;

/**
 * Electron IPC renderer-side API to exchange messages with the main process.
 *
 * @see https://www.electronjs.org/docs/latest/tutorial/ipc
 */
export interface IpcApi {
  /** Called when the sidebar is toggled from the main process (e.g. application menu) */
  onToggleSidebar: (callback: OnToggleSidebarHandler) => void;

  /**
   * Updates the application menu when the sidebar is toggled within the renderer
   *
   * @param open true if the sidebar is open
   */
  toggleSidebar: (open: boolean) => void;

  /** Called when navigation is triggered from the main process (e.g. application menu) */
  onNavigate: (callback: OnNavigateHandler) => void;

  /** Called when the database is updated so that Redux Toolkit Query can re-fetch changed data. */
  onInvalidateTags: (callback: OnInvalidateTagsHandler) => void;

  findBookById: (id: string) => Promise<Book | null>;
  findAllBooks: () => Promise<Book[]>;
  findCharacterByLiteral: (literal: string) => Promise<Character | null>;
}
