import { describe, expect, it } from 'vitest'

import { Users } from '@/collections/Users'

function allow(access: unknown, user: unknown) {
  if (typeof access !== 'function') throw new Error('missing access')
  return access({ req: { user } })
}

describe('validation access', () => {
  it('lets the owner mark a DRE and a coworking account, and blocks a content manager', () => {
    const dre = Users.fields.find((field) => 'name' in field && field.name === 'dreValidated')
    const verified = Users.fields.find((field) => 'name' in field && field.name === 'verified')
    if (!dre || !('access' in dre) || !verified || !('access' in verified)) throw new Error('missing field')
    expect(allow(dre.access?.update, { adminRole: 'owner' })).toBe(true)
    expect(allow(dre.access?.update, { adminRole: 'content-manager' })).toBe(false)
    expect(allow(dre.access?.update, { adminRole: 'moderator' })).toBe(false)
    expect(allow(verified.access?.update, { adminRole: 'owner' })).toBe(true)
    expect(allow(verified.access?.create, { adminRole: 'content-manager' })).toBe(false)
  })
})
