import { describe, expect, it } from 'vitest'

import { Listings } from '@/collections/Listings'
import { canSaveListing } from '@/lib/listingSave'

async function allow(key: 'create' | 'update', user: { adminRole?: 'content-manager' }) {
  const rule = Listings.access?.[key]
  if (typeof rule !== 'function') throw new Error(key)
  return rule({ req: { user } } as Parameters<typeof rule>[0])
}

describe('content manager listing save', () => {
  it('keeps a content manager from saving a listing', async () => {
    const user = { adminRole: 'content-manager' as const }
    expect(canSaveListing(user)).toBe(false)
    expect(await allow('create', user)).toBe(false)
    expect(await allow('update', user)).toBe(false)
  })
})
