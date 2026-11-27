import { describe, expect, it } from 'vitest'

import { moveListing, removeListing, saveListing } from '@/lib/favoriteItems'

describe('favorite items', () => {
  it('moves a saved listing into a folder and removes it', () => {
    const saved = saveListing([], { listingSlug: '201-n-brand', title: '201 N Brand' })
    expect(saveListing(saved, { listingSlug: '201-n-brand', title: '201 N Brand' })).toHaveLength(1)
    const moved = moveListing(saved, saved[0].id, 'folder-1')
    expect(moved[0]).toMatchObject({ listingSlug: '201-n-brand', folderId: 'folder-1' })
    expect(removeListing(moved, saved[0].id)).toEqual([])
  })
})
