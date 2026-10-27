import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

function lexicalUsing(column: string) {
  return `CASE
    WHEN "${column}" IS NULL OR btrim("${column}"::text) = '' THEN NULL
    WHEN left(btrim("${column}"::text), 1) = '{' THEN "${column}"::jsonb
    ELSE jsonb_build_object(
      'root', jsonb_build_object(
        'type', 'root',
        'format', '',
        'indent', 0,
        'version', 1,
        'direction', 'ltr',
        'children', jsonb_build_array(
          jsonb_build_object(
            'type', 'paragraph',
            'format', '',
            'indent', 0,
            'version', 1,
            'direction', 'ltr',
            'children', jsonb_build_array(
              jsonb_build_object(
                'type', 'text',
                'detail', 0,
                'format', 0,
                'mode', 'normal',
                'style', '',
                'text', "${column}"::text,
                'version', 1
              )
            )
          )
        )
      )
    )
  END`
}

function textUsing(column: string) {
  return `CASE WHEN "${column}" IS NULL THEN NULL ELSE "${column}"::text END`
}

const columns = [
  ['pages', 'content'],
  ['posts', 'content'],
  ['cities', 'content'],
  ['property_types', 'content'],
  ['glossary', 'definition'],
] as const

const upStatements = columns.map(
  ([table, column]) =>
    `ALTER TABLE "${table}" ALTER COLUMN "${column}" TYPE jsonb USING (${lexicalUsing(column)})`,
)

const downStatements = [...columns].reverse().map(
  ([table, column]) =>
    `ALTER TABLE "${table}" ALTER COLUMN "${column}" TYPE varchar USING (${textUsing(column)})`,
)

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
