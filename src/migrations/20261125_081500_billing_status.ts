import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

const upStatements = [
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "subscription_status" varchar`,
  `ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "account_id" integer`,
  `CREATE INDEX IF NOT EXISTS "listings_account_idx" ON "listings" USING btree ("account_id")`,
  `DO $$ BEGIN
    ALTER TABLE "listings" ADD CONSTRAINT "listings_account_id_users_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;`,
  `CREATE TABLE IF NOT EXISTS "mailbox" (
    "id" serial PRIMARY KEY NOT NULL,
    "kind" varchar NOT NULL,
    "to_address" varchar NOT NULL,
    "subject" varchar NOT NULL,
    "body" varchar NOT NULL,
    "status" varchar NOT NULL,
    "user_id" integer,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS "mailbox_user_idx" ON "mailbox" USING btree ("user_id")`,
  `CREATE INDEX IF NOT EXISTS "mailbox_updated_at_idx" ON "mailbox" USING btree ("updated_at")`,
  `CREATE INDEX IF NOT EXISTS "mailbox_created_at_idx" ON "mailbox" USING btree ("created_at")`,
  `DO $$ BEGIN
    ALTER TABLE "mailbox" ADD CONSTRAINT "mailbox_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;`,
  `ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "mailbox_id" integer`,
  `CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_mailbox_id_idx" ON "payload_locked_documents_rels" USING btree ("mailbox_id")`,
  `DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_mailbox_fk" FOREIGN KEY ("mailbox_id") REFERENCES "public"."mailbox"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;`,
]

const downStatements = [
  `ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_mailbox_fk"`,
  `DROP INDEX IF EXISTS "payload_locked_documents_rels_mailbox_id_idx"`,
  `ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "mailbox_id"`,
  `DROP TABLE IF EXISTS "mailbox"`,
  `ALTER TABLE "listings" DROP CONSTRAINT IF EXISTS "listings_account_id_users_id_fk"`,
  `DROP INDEX IF EXISTS "listings_account_idx"`,
  `ALTER TABLE "listings" DROP COLUMN IF EXISTS "account_id"`,
  `ALTER TABLE "users" DROP COLUMN IF EXISTS "subscription_status"`,
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
