import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

const upStatements = [
  `ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "lot_size" numeric`,
  `ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "cap_rate" numeric`,
  `ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "year_built" numeric`,
  `ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "units" numeric`,
  `ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "listing_code" varchar`,
]

const downStatements = [
  `ALTER TABLE "listings" DROP COLUMN IF EXISTS "listing_code"`,
  `ALTER TABLE "listings" DROP COLUMN IF EXISTS "units"`,
  `ALTER TABLE "listings" DROP COLUMN IF EXISTS "year_built"`,
  `ALTER TABLE "listings" DROP COLUMN IF EXISTS "cap_rate"`,
  `ALTER TABLE "listings" DROP COLUMN IF EXISTS "lot_size"`,
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
