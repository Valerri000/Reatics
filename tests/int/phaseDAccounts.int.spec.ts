import { describe, expect, it } from 'vitest'

import { phaseDAccountCheck } from '@/lib/phaseDAccounts'

describe('phase D review accounts', () => {
  it('keeps the review password on the four test accounts', () => {
    const accounts = phaseDAccountCheck()
    expect(accounts.matchesReview).toBe(true)
    expect(accounts.samePassword).toBe(true)
    expect(accounts.password).toBe('Review-day9-shell')
    expect(accounts.owner).toBe(true)
    expect(accounts.content).toBe(true)
    expect(accounts.moderator).toBe(true)
    expect(accounts.member).toBe(true)
    expect(accounts.reviewEmails).toEqual([
      'staging-owner@example.com',
      'staging-content@example.com',
      'staging-moderator@example.com',
      'staging-member@example.com',
    ])
  })
})
