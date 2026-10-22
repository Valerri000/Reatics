import { describe, expect, it } from 'vitest'

import { accessFor, stagingAccounts } from '@/lib/stagingAccounts'

const owner = stagingAccounts.find((account) => account.adminRole === 'owner')

describe('staging owner', () => {
  it('can open pages, listings, billing, and the audit log', () => {
    expect(owner?.email).toBe('staging-owner@example.com')
    expect(accessFor(owner!)).toEqual({
      admin: true,
      pages: true,
      listings: true,
      billing: true,
      audit: true,
    })
  })
})
