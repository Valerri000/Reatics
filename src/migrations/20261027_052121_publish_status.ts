import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

const tables = ['pages', 'posts', 'glossary', 'cities', 'property_types'] as const

function enumStatement(table: string) {
  return `DO $$ BEGIN
    CREATE TYPE "public"."enum_${table}_status" AS ENUM('draft', 'published');
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$`
}

const upStatements = [
  ...tables.map((table) => enumStatement(table)),
  ...tables.map(
    (table) =>
      `ALTER TABLE "${table}" ADD COLUMN IF NOT EXISTS "status" "enum_${table}_status" DEFAULT 'draft' NOT NULL`,
  ),
  `ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "published_on" timestamp(3) with time zone`,
  `ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "author_id" integer`,
  `CREATE INDEX IF NOT EXISTS "posts_author_idx" ON "posts" USING btree ("author_id")`,
  `DO $$ BEGIN
    ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$`,
]

const downStatements = [
  `ALTER TABLE "posts" DROP CONSTRAINT IF EXISTS "posts_author_id_users_id_fk"`,
  `DROP INDEX IF EXISTS "posts_author_idx"`,
  `ALTER TABLE "posts" DROP COLUMN IF EXISTS "author_id"`,
  `ALTER TABLE "posts" DROP COLUMN IF EXISTS "published_on"`,
  ...[...tables].reverse().map((table) => `ALTER TABLE "${table}" DROP COLUMN IF EXISTS "status"`),
  ...[...tables].reverse().map((table) => `DROP TYPE IF EXISTS "public"."enum_${table}_status"`),
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
