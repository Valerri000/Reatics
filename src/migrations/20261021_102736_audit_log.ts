import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

const upStatements = [
  `DO $$ BEGIN
    CREATE TYPE "public"."enum_audit_log_action" AS ENUM('sign-in', 'role-change', 'delete');
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$`,
  `CREATE TABLE IF NOT EXISTS "audit_log" (
    "id" serial PRIMARY KEY NOT NULL,
    "actor_id" integer,
    "action" "enum_audit_log_action" NOT NULL,
    "target" varchar NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS "audit_log_actor_idx" ON "audit_log" USING btree ("actor_id")`,
  `CREATE INDEX IF NOT EXISTS "audit_log_updated_at_idx" ON "audit_log" USING btree ("updated_at")`,
  `CREATE INDEX IF NOT EXISTS "audit_log_created_at_idx" ON "audit_log" USING btree ("created_at")`,
  `DO $$ BEGIN
    ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_actor_id_users_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$`,
]

const downStatements = [
  `DROP TABLE IF EXISTS "audit_log"`,
  `DROP TYPE IF EXISTS "public"."enum_audit_log_action"`,
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
