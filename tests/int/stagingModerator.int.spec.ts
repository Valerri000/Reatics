import { describe, expect, it } from 'vitest'

import { accessFor, stagingAccounts } from '@/lib/stagingAccounts'

const moderator = stagingAccounts.find((account) => account.adminRole === 'moderator')

describe('staging moderator', () => {
  it('can manage the sample listing and cannot open pages, billing, or the audit log', () => {
    expect(moderator?.email).toBe('staging-moderator@example.com')
    expect(accessFor(moderator!)).toEqual({
      admin: true,
      pages: false,
      listings: true,
      billing: false,
      audit: false,
    })
  })
})
