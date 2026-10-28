import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

const upStatements = [
  `CREATE TABLE IF NOT EXISTS "contact_messages" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar NOT NULL,
    "email" varchar NOT NULL,
    "message" varchar NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  )`,
]

const downStatements = [`DROP TABLE IF EXISTS "contact_messages"`]

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const statement of upStatements) {
    await db.execute(sql.raw(statement))
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const statement of downStatements) {
    await db.execute(sql.raw(statement))
  }
}
