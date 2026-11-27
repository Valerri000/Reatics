import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('favorites registration', () => {
  it('registers the favorites collections', () => {
    const config = readFileSync('src/payload.config.ts', 'utf8')
    const types = readFileSync('src/payload-types.ts', 'utf8')
    expect(config).toContain('FavoriteFolders')
    expect(config).toContain('Favorites')
    expect(types).toContain("'favorite-folders': FavoriteFolder")
    expect(types).toContain('favorites: Favorite')
  })
})
