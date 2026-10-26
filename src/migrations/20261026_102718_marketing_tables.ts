import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

const seoColumns = `
    "slug" varchar NOT NULL,
    "page_title" varchar,
    "meta_description" varchar,
    "robots" varchar_type DEFAULT 'index',
    "canonical_url" varchar,
    "h1" varchar,
    "image_alt" varchar,
    "social_title" varchar,
    "social_description" varchar,
    "sitemap" boolean DEFAULT true,`

function enumStatement(name: string) {
  return `DO $$ BEGIN
    CREATE TYPE "public"."${name}" AS ENUM('index', 'noindex');
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$`
}

function tableStatement(table: string, leading: string) {
  const columns = seoColumns.replace('varchar_type', `"enum_${table}_robots"`)
  return `CREATE TABLE IF NOT EXISTS "${table}" (
    "id" serial PRIMARY KEY NOT NULL,
    ${leading}
    ${columns}
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  )`
}

const tables = [
  {
    name: 'posts',
    leading: `"title" varchar NOT NULL,
    "content" varchar,`,
  },
  {
    name: 'glossary',
    leading: `"term" varchar NOT NULL,
    "definition" varchar,`,
  },
  {
    name: 'cities',
    leading: `"title" varchar NOT NULL,
    "content" varchar,`,
  },
  {
    name: 'property_types',
    leading: `"title" varchar NOT NULL,
    "content" varchar,`,
  },
] as const

const upStatements = [
  ...tables.map((table) => enumStatement(`enum_${table.name}_robots`)),
  ...tables.map((table) => tableStatement(table.name, table.leading)),
  ...tables.flatMap((table) => [
    `CREATE UNIQUE INDEX IF NOT EXISTS "${table.name}_slug_idx" ON "${table.name}" USING btree ("slug")`,
    `CREATE INDEX IF NOT EXISTS "${table.name}_updated_at_idx" ON "${table.name}" USING btree ("updated_at")`,
    `CREATE INDEX IF NOT EXISTS "${table.name}_created_at_idx" ON "${table.name}" USING btree ("created_at")`,
  ]),
]

const downStatements = [
  ...[...tables].reverse().map((table) => `DROP TABLE IF EXISTS "${table.name}"`),
  ...[...tables].reverse().map((table) => `DROP TYPE IF EXISTS "public"."enum_${table.name}_robots"`),
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
