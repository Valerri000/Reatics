import { describe, expect, it } from 'vitest'

import { Users } from '@/collections/Users'
import { signupGuard } from '@/lib/signupGuard'

describe('signup guard', () => {
  it('rejects a broker without a DRE and keeps the hook on users', () => {
    expect(Users.hooks?.beforeChange).toContain(signupGuard)
    expect(() =>
      signupGuard({
        data: { role: 'broker', dreNumber: '', email: 'a@example.com', password: 'password123' },
        operation: 'create',
        req: { user: null },
      } as never),
    ).toThrow(/dreNumber/)
    const seeker = signupGuard({
      data: { role: 'space-seeker', email: 'b@example.com', password: 'password123' },
      operation: 'create',
      req: { user: null },
    } as never) as { dreNumber?: string; verified?: boolean }
    expect(seeker.verified).toBe(false)
    expect(seeker.dreNumber).toBeUndefined()
  })
})
