import { describe, expect, it } from 'vitest'

import { Favorites } from '@/collections/Favorites'

describe('favorites collection', () => {
  it('stores a saved listing in a folder', () => {
    expect(Favorites.slug).toBe('favorites')
    const names = Favorites.fields.map((field) => ('name' in field ? field.name : ''))
    expect(names).toEqual(['listing', 'folder', 'user'])
    const folder = Favorites.fields.find((field) => 'name' in field && field.name === 'folder')
    expect(folder).toMatchObject({ type: 'relationship', relationTo: 'favorite-folders' })
  })
})
