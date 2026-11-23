import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

const upStatements = [
  `CREATE TABLE IF NOT EXISTS "subscriptions" (
    "id" serial PRIMARY KEY NOT NULL,
    "user_id" integer,
    "plan_id" varchar NOT NULL,
    "status" varchar NOT NULL,
    "amount_cents" numeric NOT NULL,
    "stripe_customer_id" varchar,
    "stripe_subscription_id" varchar,
    "stripe_checkout_session_id" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "subscriptions_checkout_session_idx" ON "subscriptions" USING btree ("stripe_checkout_session_id")`,
  `CREATE INDEX IF NOT EXISTS "subscriptions_user_idx" ON "subscriptions" USING btree ("user_id")`,
  `CREATE INDEX IF NOT EXISTS "subscriptions_updated_at_idx" ON "subscriptions" USING btree ("updated_at")`,
  `CREATE INDEX IF NOT EXISTS "subscriptions_created_at_idx" ON "subscriptions" USING btree ("created_at")`,
  `DO $$ BEGIN
    ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;`,
  `ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "subscriptions_id" integer`,
  `CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_subscriptions_id_idx" ON "payload_locked_documents_rels" USING btree ("subscriptions_id")`,
  `DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_subscriptions_fk" FOREIGN KEY ("subscriptions_id") REFERENCES "public"."subscriptions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;`,
]

const downStatements = [
  `ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_subscriptions_fk"`,
  `DROP INDEX IF EXISTS "payload_locked_documents_rels_subscriptions_id_idx"`,
  `ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "subscriptions_id"`,
  `DROP TABLE IF EXISTS "subscriptions"`,
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
