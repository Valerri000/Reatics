import { describe, expect, it } from 'vitest'

import { reviewAccounts, reviewPassword, stagingAdmin, stagingOrigin } from '@/lib/reviewAccounts'

describe('staging review accounts', () => {
  it('keeps the existing password and the four accounts', () => {
    expect(stagingOrigin).toBe('https://18.118.84.127')
    expect(stagingAdmin).toBe('https://18.118.84.127/admin')
    expect(reviewPassword).toBe('Review-day9-shell')
    expect(reviewAccounts.map((account) => account.email)).toEqual([
      'staging-owner@example.com',
      'staging-content@example.com',
      'staging-moderator@example.com',
      'staging-member@example.com',
    ])
  })
})
