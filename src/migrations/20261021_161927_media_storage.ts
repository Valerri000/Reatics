import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

const upStatements = [
  `ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "prefix" varchar`,
  `ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "_objectkey" varchar`,
]

const downStatements = [
  `ALTER TABLE "media" DROP COLUMN IF EXISTS "_objectkey"`,
  `ALTER TABLE "media" DROP COLUMN IF EXISTS "prefix"`,
]

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
