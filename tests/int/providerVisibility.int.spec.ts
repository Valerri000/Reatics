import { describe, expect, it } from 'vitest'

import { canList } from '@/lib/access'
import { coworkingCanSignIn, publicCoworkingProvider } from '@/lib/providerVisibility'

describe('coworking visibility', () => {
  it('lets an unverified provider sign in and keeps them off the public list', () => {
    const account = { id: 4, email: 'provider@example.com', role: 'coworking' as const, verified: false }
    expect(coworkingCanSignIn(account)).toBe(true)
    expect(publicCoworkingProvider(account)).toBe(false)
    expect(canList(account)).toBe(false)
    expect(publicCoworkingProvider({ ...account, verified: true })).toBe(true)
    expect(canList({ ...account, verified: true })).toBe(true)
  })
})
