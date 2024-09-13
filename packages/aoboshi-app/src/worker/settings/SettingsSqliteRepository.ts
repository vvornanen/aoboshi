import { Database } from "better-sqlite3";
import { AbstractSqliteRepository, PreparedStatement } from "~/worker";
import { AppSettings } from "~/worker/settings/AppSettings";
import { SettingsRepository } from "~/worker/settings/SettingsRepository";

type SettingsRow = {
  id: number;
  settings: string;
};

export class SettingsSqliteRepository
  extends AbstractSqliteRepository<AppSettings, SettingsRow, number>
  implements SettingsRepository
{
  constructor(db: Database) {
    super(db, "Settings");
  }

  find(): AppSettings | null {
    return this.findById(this.getId());
  }

  protected prepareSave(): PreparedStatement<SettingsRow> {
    return this.db.prepare(
      `
          insert into Settings (id, settings)
          values (@id, @settings)
          on conflict do update set settings = @settings
      `,
    );
  }

  protected getId(): number {
    return 1;
  }

  protected toEntity(row: SettingsRow): AppSettings {
    return JSON.parse(row.settings);
  }

  protected toRow(entity: AppSettings): SettingsRow {
    return {
      id: 1,
      settings: JSON.stringify(entity),
    };
  }
}
