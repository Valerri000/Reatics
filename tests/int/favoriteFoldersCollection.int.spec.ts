import { describe, expect, it } from 'vitest'

import { FavoriteFolders } from '@/collections/FavoriteFolders'

describe('favorite folders collection', () => {
  it('stores a folder for a member', () => {
    expect(FavoriteFolders.slug).toBe('favorite-folders')
    const names = FavoriteFolders.fields.map((field) => ('name' in field ? field.name : ''))
    expect(names).toEqual(['name', 'user'])
  })
})
