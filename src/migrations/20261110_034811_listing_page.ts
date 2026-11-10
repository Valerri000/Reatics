import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

const upStatements = [
  `ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "description" varchar`,
  `ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "availability" varchar DEFAULT 'available'`,
  `ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "broker_name" varchar`,
  `ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "broker_company" varchar`,
  `ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "broker_phone" varchar`,
  `ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "broker_email" varchar`,
  `ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "availabilities" jsonb`,
]

const downStatements = [
  `ALTER TABLE "listings" DROP COLUMN IF EXISTS "availabilities"`,
  `ALTER TABLE "listings" DROP COLUMN IF EXISTS "broker_email"`,
  `ALTER TABLE "listings" DROP COLUMN IF EXISTS "broker_phone"`,
  `ALTER TABLE "listings" DROP COLUMN IF EXISTS "broker_company"`,
  `ALTER TABLE "listings" DROP COLUMN IF EXISTS "broker_name"`,
  `ALTER TABLE "listings" DROP COLUMN IF EXISTS "availability"`,
  `ALTER TABLE "listings" DROP COLUMN IF EXISTS "description"`,
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
