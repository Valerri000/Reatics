import { describe, expect, it } from 'vitest'

import { Posts } from '@/collections/Posts'
import { isPublicRecord, readPublishedMarketing } from '@/lib/draftAccess'

function allow(access: unknown, user: unknown) {
  if (typeof access !== 'function') throw new Error('missing access')
  return access({ req: { user } })
}

describe('draft visibility', () => {
  it('hides a draft from a visitor', () => {
    expect(isPublicRecord({ status: 'draft' })).toBe(false)
    expect(isPublicRecord({ status: 'published' })).toBe(true)
    expect(allow(readPublishedMarketing, null)).toEqual({ status: { equals: 'published' } })
    expect(allow(Posts.access?.read, null)).toEqual({ status: { equals: 'published' } })
    expect(allow(Posts.access?.read, { adminRole: 'moderator' })).toEqual({
      status: { equals: 'published' },
    })
  })

  it('lets a content manager open a draft', () => {
    expect(allow(readPublishedMarketing, { adminRole: 'content-manager' })).toBe(true)
    expect(allow(Posts.access?.read, { adminRole: 'owner' })).toBe(true)
  })
})
