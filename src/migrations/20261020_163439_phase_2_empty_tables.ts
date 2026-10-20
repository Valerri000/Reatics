import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

const upStatements = [
  `CREATE TABLE IF NOT EXISTS "companies" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS "companies_updated_at_idx" ON "companies" USING btree ("updated_at")`,
  `CREATE INDEX IF NOT EXISTS "companies_created_at_idx" ON "companies" USING btree ("created_at")`,
  `CREATE TABLE IF NOT EXISTS "company_members" (
    "id" serial PRIMARY KEY NOT NULL,
    "company_id" integer NOT NULL,
    "user_id" integer NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS "company_members_company_idx" ON "company_members" USING btree ("company_id")`,
  `CREATE INDEX IF NOT EXISTS "company_members_user_idx" ON "company_members" USING btree ("user_id")`,
  `CREATE INDEX IF NOT EXISTS "company_members_updated_at_idx" ON "company_members" USING btree ("updated_at")`,
  `CREATE INDEX IF NOT EXISTS "company_members_created_at_idx" ON "company_members" USING btree ("created_at")`,
  `CREATE TABLE IF NOT EXISTS "deals" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "company_id" integer,
    "listing_id" integer,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS "deals_company_idx" ON "deals" USING btree ("company_id")`,
  `CREATE INDEX IF NOT EXISTS "deals_listing_idx" ON "deals" USING btree ("listing_id")`,
  `CREATE INDEX IF NOT EXISTS "deals_updated_at_idx" ON "deals" USING btree ("updated_at")`,
  `CREATE INDEX IF NOT EXISTS "deals_created_at_idx" ON "deals" USING btree ("created_at")`,
  `CREATE TABLE IF NOT EXISTS "deal_participants" (
    "id" serial PRIMARY KEY NOT NULL,
    "deal_id" integer NOT NULL,
    "user_id" integer NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS "deal_participants_deal_idx" ON "deal_participants" USING btree ("deal_id")`,
  `CREATE INDEX IF NOT EXISTS "deal_participants_user_idx" ON "deal_participants" USING btree ("user_id")`,
  `CREATE INDEX IF NOT EXISTS "deal_participants_updated_at_idx" ON "deal_participants" USING btree ("updated_at")`,
  `CREATE INDEX IF NOT EXISTS "deal_participants_created_at_idx" ON "deal_participants" USING btree ("created_at")`,
  `CREATE TABLE IF NOT EXISTS "screening_requests" (
    "id" serial PRIMARY KEY NOT NULL,
    "deal_id" integer,
    "note" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS "screening_requests_deal_idx" ON "screening_requests" USING btree ("deal_id")`,
  `CREATE INDEX IF NOT EXISTS "screening_requests_updated_at_idx" ON "screening_requests" USING btree ("updated_at")`,
  `CREATE INDEX IF NOT EXISTS "screening_requests_created_at_idx" ON "screening_requests" USING btree ("created_at")`,
  `CREATE TABLE IF NOT EXISTS "lease_drafts" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar,
    "deal_id" integer,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS "lease_drafts_deal_idx" ON "lease_drafts" USING btree ("deal_id")`,
  `CREATE INDEX IF NOT EXISTS "lease_drafts_updated_at_idx" ON "lease_drafts" USING btree ("updated_at")`,
  `CREATE INDEX IF NOT EXISTS "lease_drafts_created_at_idx" ON "lease_drafts" USING btree ("created_at")`,
  `CREATE TABLE IF NOT EXISTS "signed_documents" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar,
    "lease_draft_id" integer,
    "file_id" integer,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS "signed_documents_lease_draft_idx" ON "signed_documents" USING btree ("lease_draft_id")`,
  `CREATE INDEX IF NOT EXISTS "signed_documents_file_idx" ON "signed_documents" USING btree ("file_id")`,
  `CREATE INDEX IF NOT EXISTS "signed_documents_updated_at_idx" ON "signed_documents" USING btree ("updated_at")`,
  `CREATE INDEX IF NOT EXISTS "signed_documents_created_at_idx" ON "signed_documents" USING btree ("created_at")`,
]

const foreignKeys = [
  ['company_members', 'company_members_company_id_companies_id_fk', 'company_id', 'companies'],
  ['company_members', 'company_members_user_id_users_id_fk', 'user_id', 'users'],
  ['deals', 'deals_company_id_companies_id_fk', 'company_id', 'companies'],
  ['deals', 'deals_listing_id_listings_id_fk', 'listing_id', 'listings'],
  ['deal_participants', 'deal_participants_deal_id_deals_id_fk', 'deal_id', 'deals'],
  ['deal_participants', 'deal_participants_user_id_users_id_fk', 'user_id', 'users'],
  ['screening_requests', 'screening_requests_deal_id_deals_id_fk', 'deal_id', 'deals'],
  ['lease_drafts', 'lease_drafts_deal_id_deals_id_fk', 'deal_id', 'deals'],
  [
    'signed_documents',
    'signed_documents_lease_draft_id_lease_drafts_id_fk',
    'lease_draft_id',
    'lease_drafts',
  ],
  ['signed_documents', 'signed_documents_file_id_media_id_fk', 'file_id', 'media'],
] as const

const downStatements = [
  `DROP TABLE IF EXISTS "signed_documents"`,
  `DROP TABLE IF EXISTS "lease_drafts"`,
  `DROP TABLE IF EXISTS "screening_requests"`,
  `DROP TABLE IF EXISTS "deal_participants"`,
  `DROP TABLE IF EXISTS "deals"`,
  `DROP TABLE IF EXISTS "company_members"`,
  `DROP TABLE IF EXISTS "companies"`,
]

function foreignKeyStatement(
  table: string,
  constraint: string,
  column: string,
  referenced: string,
) {
  return `DO $$ BEGIN
    ALTER TABLE "${table}" ADD CONSTRAINT "${constraint}" FOREIGN KEY ("${column}") REFERENCES "public"."${referenced}"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
  END $$;`
}

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const statement of upStatements) {
    await db.execute(sql.raw(statement))
  }
  for (const [table, constraint, column, referenced] of foreignKeys) {
    await db.execute(sql.raw(foreignKeyStatement(table, constraint, column, referenced)))
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const statement of downStatements) {
    await db.execute(sql.raw(statement))
  }
}
