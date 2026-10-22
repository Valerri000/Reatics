import { describe, expect, it } from 'vitest'

import { accessFor, stagingAccounts } from '@/lib/stagingAccounts'

const member = stagingAccounts.find((account) => account.adminRole === null)

describe('staging member', () => {
  it('can sign in on the site and cannot open the admin', () => {
    expect(member?.email).toBe('staging-member@example.com')
    expect(member?.role).toBe('space-seeker')
    expect(accessFor(member!)).toEqual({
      admin: false,
      pages: false,
      listings: false,
      billing: false,
      audit: false,
    })
  })
})
