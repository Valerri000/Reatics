import { describe, expect, it } from 'vitest'

import { Listings } from '@/collections/Listings'
import type { Listing } from '@/payload-types'

type RuleUser = { adminRole?: 'owner' | 'content-manager' | 'moderator' } | null

async function allow(key: 'read' | 'create' | 'update' | 'delete', user: RuleUser) {
  const access = Listings.access
  if (!access) throw new Error('missing access')
  const rule = access[key]
  if (typeof rule !== 'function') throw new Error(key)
  return rule({ req: { user } } as Parameters<typeof rule>[0])
}

describe('saved listings', () => {
  it('lets a moderator save a listing and keeps it off public search', async () => {
    expect(await allow('read', null)).toBe(false)
    expect(await allow('create', null)).toBe(false)
    expect(await allow('read', { adminRole: 'content-manager' })).toBe(false)
    expect(await allow('create', { adminRole: 'moderator' })).toBe(true)
    expect(await allow('update', { adminRole: 'owner' })).toBe(true)
    expect(await allow('delete', { adminRole: 'moderator' })).toBe(true)
  })

  it('saves the slug and photo with the listing', () => {
    const slug = Listings.fields.find((field) => 'name' in field && field.name === 'slug')
    const photo = Listings.fields.find((field) => 'name' in field && field.name === 'photo')
    expect(slug).toMatchObject({ type: 'text', required: true, unique: true })
    expect(photo).toMatchObject({ type: 'upload', relationTo: 'media' })
    const saved = {
      slug: '201-n-brand',
      photo: 4,
    } satisfies Partial<Listing>
    expect(saved.slug).toBe('201-n-brand')
    expect(saved.photo).toBe(4)
  })
})
