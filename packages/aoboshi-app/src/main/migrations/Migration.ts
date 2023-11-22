import { ApplicationContext } from "../ApplicationContext";

export interface Migration {
  id: string;
  run(context: ApplicationContext): void;
}
