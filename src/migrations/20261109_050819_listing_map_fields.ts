import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

const upStatements = [
  `ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "square_footage" numeric`,
  `ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "keywords" varchar`,
  `ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "county" varchar`,
  `ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "latitude" numeric`,
  `ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "longitude" numeric`,
]

const downStatements = [
  `ALTER TABLE "listings" DROP COLUMN IF EXISTS "longitude"`,
  `ALTER TABLE "listings" DROP COLUMN IF EXISTS "latitude"`,
  `ALTER TABLE "listings" DROP COLUMN IF EXISTS "county"`,
  `ALTER TABLE "listings" DROP COLUMN IF EXISTS "keywords"`,
  `ALTER TABLE "listings" DROP COLUMN IF EXISTS "square_footage"`,
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
