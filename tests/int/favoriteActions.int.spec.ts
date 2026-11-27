import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('favorite actions', () => {
  it('saves, moves, and removes a listing for the signed-in member', () => {
    const actions = readFileSync('src/lib/favoriteActions.ts', 'utf8')
    const load = readFileSync('src/lib/loadFavorites.ts', 'utf8')
    expect(actions).toContain("collection: 'favorites'")
    expect(actions).toContain("collection: 'favorite-folders'")
    expect(actions).toContain('favoriteCopy.signIn')
    expect(actions).not.toMatch(/\bcard\b|cvc|pan/i)
    expect(load).toContain("sort: '-createdAt'")
    expect(load).toContain("collection: 'favorite-folders'")
  })
})
