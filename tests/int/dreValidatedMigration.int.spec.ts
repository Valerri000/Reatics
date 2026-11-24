import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('DRE validated column', () => {
  it('adds a boolean flag and no card column', () => {
    const migration = readFileSync('src/migrations/20261124_081500_dre_validated.ts', 'utf8')
    const index = readFileSync('src/migrations/index.ts', 'utf8')
    expect(migration).toContain('ADD COLUMN IF NOT EXISTS "dre_validated" boolean DEFAULT false')
    expect(migration.toLowerCase()).not.toContain('card')
    expect(index).toContain('20261124_081500_dre_validated')
  })
})
