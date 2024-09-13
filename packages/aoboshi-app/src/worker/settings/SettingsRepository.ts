import { Repository } from "@vvornanen/aoboshi-core";
import { Settings } from "~/worker/settings";

export interface SettingsRepository extends Repository<Settings, number> {
  find(): Settings | null;
}
