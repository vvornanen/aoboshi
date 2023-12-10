import { JobOptions } from "bree";

const jobs = [
  {
    name: "import-kanji",
    timeout: false, // Run only manually or from migration
  },
] as const satisfies JobOptions[];

/** Union of valid job names that can be passed to the Scheduler */
export type JobName = (typeof jobs)[number]["name"];

export default jobs;
