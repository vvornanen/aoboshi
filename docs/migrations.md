# Migrations

Migrations are used for managing the SQLite database schema and data.
Migrations are written in Typescript and are run during application initialization.
Migrations have access to the application context,
so it is possible to execute also more complex tasks than basic SQL.

`MigrationService` is a lightweight solution for managing migrations in Electron application runtime.
It runs each migration only once and keeps a changelog in the database.

Migration files are located in directory `packages/aoboshi-app/src/migrations`.

Migration files starting with a number are run before services are initialized.
This ensures that all changes to the database schema are applied before calling any services.
Migration files starting with `A` are run after the application has been initialized.
These after-init migrations should be used when the migration depends on any service.

## Basic example

A migration file must provide at least a `description` and `run` function in the default export:

```ts
import { Migration } from "../main/migration/Migration";

export default {
  description: "Basic example",
  async run({ database }): Promise<void> {
    database.exec(`create table…`);
  },
} satisfies Migration;
```

## Using services

The `run` function takes the `ApplicationContext` as its argument,
so it is possible to create also higher-level tasks calling any service.

Note that services using the database work only with the current schema,
so migrations using services must be run only after all schema migrations.

```ts
import { Book } from "@vvornanen/aoboshi-core/books/Book";
import { Migration } from "../main/migration/Migration";

const book: Book = {...};

export default {
  description: "Example with services",
  async run({ bookRepository }): Promise<void> {
    bookRepository.save({...});
  },
} satisfies Migration;
```

## Repeatable migrations

By default, migrations are run only once.
However, it is possible to re-run a migration when the content changes.
`MigrationService` handles this by storing a hash of the migration file contents.
If the migration is marked as repeatable, `MigrationService` re-runs it when the content changes.

```ts
import { Book } from "@vvornanen/aoboshi-core/books/Book";
import { Migration } from "../main/migration/Migration";

export default {
  description: "Repeatable example",
  repeatable: true,
  async run(): Promise<void> {
    // Insert some maintenance task here
  },
} satisfies Migration;
```

## Background jobs

Calling the scheduler from a migration can be used to run a slow one-time job in a worker thread.
Scheduler should be used only in after-init migrations.

If the migration is repeatable, update a version number in the description to trigger it again.

```ts
import { Migration } from "../main/migration/Migration";

export default {
  description: "Background job example (v1)",
  repeatable: true,
  async run({ scheduler }): Promise<void> {
    await scheduler.run("example-job");
  },
} satisfies Migration;
```

## Database schema

File `schema.sql` in the migrations directory contains the current database schema.
Currently, this schema is used only in tests.
In the future, it can also be used for creating a new database from scratch,
which may be more efficient than applying all migrations one-by-one.

The file is exported from the dev database after running all migrations.

First, add a migration file modifying the schema.
Then, update the schema by running:

```zsh
yarn start
yarn schema
```

Finally, commit the changed file to the version control.
