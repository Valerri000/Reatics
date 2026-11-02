import { describe, expect, it } from 'vitest'

import { Redirects } from '@/collections/Redirects'
import { canAddRedirect } from '@/lib/redirectAccess'
import type { RoleUser } from '@/lib/roles'

function allow(access: unknown, user: RoleUser) {
  if (typeof access !== 'function') throw new Error('missing access')
  return access({ req: { user } })
}

const editor: RoleUser = { id: 2, adminRole: 'content-manager' }
const seeker: RoleUser = { id: 4, adminRole: null }
const moderator: RoleUser = { id: 3, adminRole: 'moderator' }

describe('redirect access', () => {
  it('lets a content manager add a redirect', () => {
    expect(canAddRedirect(editor)).toBe(true)
    expect(allow(Redirects.access?.create, editor)).toBe(true)
    expect(allow(Redirects.access?.update, editor)).toBe(true)
    expect(allow(Redirects.access?.read, editor)).toBe(true)
  })

  it('keeps a space seeker from adding a redirect', () => {
    expect(canAddRedirect(seeker)).toBe(false)
    expect(canAddRedirect(moderator)).toBe(false)
    expect(allow(Redirects.access?.create, seeker)).toBe(false)
    expect(allow(Redirects.access?.update, seeker)).toBe(false)
    expect(allow(Redirects.access?.delete, seeker)).toBe(false)
    expect(allow(Redirects.access?.read, seeker)).toBe(false)
  })
})
