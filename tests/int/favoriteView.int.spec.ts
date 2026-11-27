import { describe, expect, it } from 'vitest'

import { favoriteView } from '@/lib/favoriteView'

describe('favorite view', () => {
  it('names the empty page, the folders, and one saved listing', () => {
    expect(favoriteView({ folders: 0, saved: 0 })).toBe('empty')
    expect(favoriteView({ folders: 2, saved: 0 })).toBe('folders')
    expect(favoriteView({ folders: 1, saved: 1 })).toBe('saved')
  })
})
