import { describe, expect, it } from 'vitest'

import { accessFor, stagingAccounts } from '@/lib/stagingAccounts'

const content = stagingAccounts.find((account) => account.adminRole === 'content-manager')

describe('staging content manager', () => {
  it('can edit the city page and cannot open listings, billing, or the audit log', () => {
    expect(content?.email).toBe('staging-content@example.com')
    expect(accessFor(content!)).toEqual({
      admin: true,
      pages: true,
      listings: false,
      billing: false,
      audit: false,
    })
  })
})
