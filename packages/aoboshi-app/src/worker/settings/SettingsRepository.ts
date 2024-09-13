import { Repository } from "@vvornanen/aoboshi-core";
import { AppSettings } from "~/worker/settings";

export interface SettingsRepository extends Repository<AppSettings, number> {
  find(): AppSettings | null;
}
