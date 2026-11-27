import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

const upStatements = [
  `CREATE TABLE IF NOT EXISTS "favorite_folders" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar NOT NULL,
    "user_id" integer NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS "favorite_folders_user_idx" ON "favorite_folders" USING btree ("user_id")`,
  `CREATE INDEX IF NOT EXISTS "favorite_folders_updated_at_idx" ON "favorite_folders" USING btree ("updated_at")`,
  `CREATE INDEX IF NOT EXISTS "favorite_folders_created_at_idx" ON "favorite_folders" USING btree ("created_at")`,
  `DO $$ BEGIN
    ALTER TABLE "favorite_folders" ADD CONSTRAINT "favorite_folders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;`,
  `CREATE TABLE IF NOT EXISTS "favorites" (
    "id" serial PRIMARY KEY NOT NULL,
    "listing_id" integer NOT NULL,
    "folder_id" integer,
    "user_id" integer NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS "favorites_listing_idx" ON "favorites" USING btree ("listing_id")`,
  `CREATE INDEX IF NOT EXISTS "favorites_folder_idx" ON "favorites" USING btree ("folder_id")`,
  `CREATE INDEX IF NOT EXISTS "favorites_user_idx" ON "favorites" USING btree ("user_id")`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "favorites_user_listing_idx" ON "favorites" USING btree ("user_id", "listing_id")`,
  `CREATE INDEX IF NOT EXISTS "favorites_updated_at_idx" ON "favorites" USING btree ("updated_at")`,
  `CREATE INDEX IF NOT EXISTS "favorites_created_at_idx" ON "favorites" USING btree ("created_at")`,
  `DO $$ BEGIN
    ALTER TABLE "favorites" ADD CONSTRAINT "favorites_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;`,
  `DO $$ BEGIN
    ALTER TABLE "favorites" ADD CONSTRAINT "favorites_folder_id_favorite_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."favorite_folders"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;`,
  `DO $$ BEGIN
    ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;`,
  `ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "favorite_folders_id" integer`,
  `CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_favorite_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("favorite_folders_id")`,
  `DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_favorite_folders_fk" FOREIGN KEY ("favorite_folders_id") REFERENCES "public"."favorite_folders"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;`,
  `ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "favorites_id" integer`,
  `CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_favorites_id_idx" ON "payload_locked_documents_rels" USING btree ("favorites_id")`,
  `DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_favorites_fk" FOREIGN KEY ("favorites_id") REFERENCES "public"."favorites"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;`,
]

const downStatements = [
  `ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_favorites_fk"`,
  `DROP INDEX IF EXISTS "payload_locked_documents_rels_favorites_id_idx"`,
  `ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "favorites_id"`,
  `ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_favorite_folders_fk"`,
  `DROP INDEX IF EXISTS "payload_locked_documents_rels_favorite_folders_id_idx"`,
  `ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "favorite_folders_id"`,
  `DROP TABLE IF EXISTS "favorites"`,
  `DROP TABLE IF EXISTS "favorite_folders"`,
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
