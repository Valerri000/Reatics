import { describe, expect, it } from 'vitest'

import { createFolder } from '@/lib/favoriteFolders'

describe('favorite folders', () => {
  it('puts a new folder at the top', () => {
    const first = createFolder([], 'Downtown', '2026-11-27T12:00:00.000Z')
    const next = createFolder(first, 'Westside', '2026-11-27T13:00:00.000Z')
    expect(next.map((folder) => folder.name)).toEqual(['Westside', 'Downtown'])
    expect(createFolder(next, '   ', '2026-11-27T14:00:00.000Z')).toEqual(next)
  })
})
