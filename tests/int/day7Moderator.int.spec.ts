import { describe, expect, it } from 'vitest'

import { Listings } from '@/collections/Listings'
import { canSaveListing } from '@/lib/listingSave'

async function allowUpdate(user: { adminRole?: 'owner' | 'content-manager' | 'moderator' } | null) {
  const rule = Listings.access?.update
  if (typeof rule !== 'function') throw new Error('update')
  return rule({ req: { user } } as Parameters<typeof rule>[0])
}

describe('moderator listing save', () => {
  it('lets a moderator save a listing', async () => {
    expect(canSaveListing({ adminRole: 'moderator' })).toBe(true)
    expect(await allowUpdate({ adminRole: 'moderator' })).toBe(true)
  })
})
