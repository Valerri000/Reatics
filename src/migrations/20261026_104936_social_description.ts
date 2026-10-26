import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

const upStatements = [
  `ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "social_description" varchar`,
  `ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "social_description" varchar`,
]

const downStatements = [
  `ALTER TABLE "listings" DROP COLUMN IF EXISTS "social_description"`,
  `ALTER TABLE "pages" DROP COLUMN IF EXISTS "social_description"`,
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
