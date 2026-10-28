import { describe, expect, it } from 'vitest'

import { Cities } from '@/collections/Cities'
import { Glossary } from '@/collections/Glossary'
import { Posts } from '@/collections/Posts'
import { PropertyTypes } from '@/collections/PropertyTypes'
import { canEditMarketing, type RoleUser } from '@/lib/roles'

function allow(access: unknown, user: unknown) {
  if (typeof access !== 'function') throw new Error('missing access')
  return access({ req: { user } })
}

const owner: RoleUser = { id: 1, adminRole: 'owner' }
const editor: RoleUser = { id: 2, adminRole: 'content-manager' }
const moderator: RoleUser = { id: 3, adminRole: 'moderator' }
const seeker: RoleUser = { id: 4, adminRole: null }

const collections = [Posts, Glossary, Cities, PropertyTypes]

describe('marketing access', () => {
  it('lets a content manager and the owner edit each marketing record', () => {
    expect(canEditMarketing(editor)).toBe(true)
    expect(canEditMarketing(owner)).toBe(true)
    for (const collection of collections) {
      expect(allow(collection.access?.create, editor)).toBe(true)
      expect(allow(collection.access?.update, editor)).toBe(true)
      expect(allow(collection.access?.delete, owner)).toBe(true)
      expect(allow(collection.access?.read, editor)).toBe(true)
      expect(allow(collection.access?.read, seeker)).toEqual({
        status: { equals: 'published' },
      })
    }
  })

  it('keeps a moderator from publishing marketing records', () => {
    expect(canEditMarketing(moderator)).toBe(false)
    expect(canEditMarketing(seeker)).toBe(false)
    for (const collection of collections) {
      expect(allow(collection.access?.create, moderator)).toBe(false)
      expect(allow(collection.access?.update, moderator)).toBe(false)
      expect(allow(collection.access?.delete, moderator)).toBe(false)
    }
  })
})
