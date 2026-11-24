import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

const upStatements = [`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "dre_validated" boolean DEFAULT false`]

const downStatements = [`ALTER TABLE "users" DROP COLUMN IF EXISTS "dre_validated"`]

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
