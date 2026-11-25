import { describe, expect, it } from 'vitest'

import { Users } from '@/collections/Users'
import { signupGuard } from '@/lib/signupGuard'

function allow(access: unknown, user: unknown) {
  if (typeof access !== 'function') throw new Error('missing access')
  return access({ req: { user } })
}

describe('billing access', () => {
  it('lets only an owner admin set the subscription status', () => {
    const field = Users.fields.find((item) => 'name' in item && item.name === 'subscriptionStatus')
    if (!field || !('access' in field) || !('options' in field) || !Array.isArray(field.options)) {
      throw new Error('missing field')
    }
    expect(field.options.map((option) => (typeof option === 'string' ? option : option.value))).toEqual([
      'active',
      'past_due',
      'canceled',
      'comped',
    ])
    expect(allow(field.access?.update, { adminRole: 'owner' })).toBe(true)
    expect(allow(field.access?.update, { adminRole: 'content-manager' })).toBe(false)
    expect(allow(field.access?.create, { adminRole: 'moderator' })).toBe(false)
    const created = signupGuard({
      data: {
        role: 'broker',
        dreNumber: '01234567',
        email: 'broker@example.com',
        password: 'password123',
        subscriptionStatus: 'comped',
      },
      operation: 'create',
      req: { user: null },
    } as never) as { subscriptionStatus?: string | null }
    expect(created.subscriptionStatus).toBeNull()
    const dropped = signupGuard({
      data: { subscriptionStatus: 'canceled' },
      operation: 'update',
      originalDoc: { role: 'broker' },
      req: { user: { adminRole: 'content-manager' } },
    } as never) as { subscriptionStatus?: string }
    expect(dropped.subscriptionStatus).toBeUndefined()
  })
})
