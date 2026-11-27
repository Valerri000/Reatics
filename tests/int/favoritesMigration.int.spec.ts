import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('favorites migration', () => {
  it('adds the favorites tables', () => {
    const source = readFileSync('src/migrations/20261127_081500_favorites.ts', 'utf8')
    const index = readFileSync('src/migrations/index.ts', 'utf8')
    expect(source).toContain('favorite_folders')
    expect(source).toContain('"favorites"')
    expect(source).toContain('favorite_folders_id')
    expect(source).toContain('favorites_id')
    expect(index).toContain('20261127_081500_favorites')
  })
})
