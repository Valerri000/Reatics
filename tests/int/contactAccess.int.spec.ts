import { describe, expect, it } from 'vitest'

import { ContactMessages } from '@/collections/ContactMessages'
import { canEditPages, type RoleUser } from '@/lib/roles'

function allow(access: unknown, user: unknown) {
  if (typeof access !== 'function') throw new Error('missing access')
  return access({ req: { user } })
}

const editor: RoleUser = { id: 2, adminRole: 'content-manager' }
const moderator: RoleUser = { id: 3, adminRole: 'moderator' }
const seeker: RoleUser = { id: 4, adminRole: null }

describe('contact messages', () => {
  it('lets a visitor send a message and a content manager read it', () => {
    expect(ContactMessages.slug).toBe('contact-messages')
    expect(canEditPages(editor)).toBe(true)
    expect(allow(ContactMessages.access?.create, null)).toBe(true)
    expect(allow(ContactMessages.access?.read, editor)).toBe(true)
    expect(allow(ContactMessages.access?.admin, editor)).toBe(true)
    expect(allow(ContactMessages.access?.delete, editor)).toBe(true)
    expect(allow(ContactMessages.access?.update, editor)).toBe(false)
  })

  it('keeps a moderator and a member from reading messages', () => {
    expect(allow(ContactMessages.access?.read, moderator)).toBe(false)
    expect(allow(ContactMessages.access?.admin, moderator)).toBe(false)
    expect(allow(ContactMessages.access?.read, seeker)).toBe(false)
    expect(allow(ContactMessages.access?.delete, seeker)).toBe(false)
  })
})
