import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

const upStatements = [
  `CREATE TABLE IF NOT EXISTS "listing_reports" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar NOT NULL,
    "email" varchar NOT NULL,
    "error_type" varchar NOT NULL,
    "description" varchar NOT NULL,
    "listing_id" integer,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS "listing_reports_listing_idx" ON "listing_reports" USING btree ("listing_id")`,
  `CREATE INDEX IF NOT EXISTS "listing_reports_updated_at_idx" ON "listing_reports" USING btree ("updated_at")`,
  `CREATE INDEX IF NOT EXISTS "listing_reports_created_at_idx" ON "listing_reports" USING btree ("created_at")`,
  `DO $$ BEGIN
    ALTER TABLE "listing_reports" ADD CONSTRAINT "listing_reports_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;`,
]

const downStatements = [`DROP TABLE IF EXISTS "listing_reports"`]

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
