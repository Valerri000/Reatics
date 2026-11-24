import { describe, expect, it } from 'vitest'

import { signupGuard } from '@/lib/signupGuard'

describe('signup staff marks', () => {
  it('lets an owner mark validation and drops it for a content manager', () => {
    const owner = signupGuard({
      data: { verified: true, dreValidated: true },
      originalDoc: { role: 'coworking', referralAccepted: true },
      operation: 'update',
      req: { user: { adminRole: 'owner' } },
    } as never) as { verified?: boolean; dreValidated?: boolean }
    expect(owner.verified).toBe(true)
    expect(owner.dreValidated).toBe(true)

    const editor = signupGuard({
      data: { verified: true, dreValidated: true },
      originalDoc: { role: 'coworking', referralAccepted: true },
      operation: 'update',
      req: { user: { adminRole: 'content-manager' } },
    } as never) as { verified?: boolean; dreValidated?: boolean }
    expect(editor.verified).toBeUndefined()
    expect(editor.dreValidated).toBeUndefined()

    const created = signupGuard({
      data: { role: 'broker-owner', dreNumber: '01234567', password: 'password123', listsProperties: false },
      operation: 'create',
      req: { user: null },
    } as never) as { listsProperties?: boolean; dreValidated?: boolean }
    expect(created.listsProperties).toBe(true)
    expect(created.dreValidated).toBe(false)
  })
})
