import { describe, expect, it } from 'vitest'

import { phaseBAdminPath, phaseBHost, phaseBReviewEmails, phaseBReviewHost } from '@/lib/phaseB'
import { stagingAccounts } from '@/lib/stagingAccounts'

describe('Phase B review host', () => {
  it('uses the AWS staging site', () => {
    expect(phaseBHost).toBe('https://18.118.84.127')
    expect(phaseBReviewHost(phaseBHost)).toBe(true)
    expect(phaseBReviewHost('https://example.com')).toBe(false)
  })

  it('opens the admin on that host', () => {
    expect(phaseBAdminPath).toBe('/admin')
    expect(`${phaseBHost}${phaseBAdminPath}`).toBe('https://18.118.84.127/admin')
  })

  it('keeps the four review accounts', () => {
    expect(phaseBReviewEmails).toEqual(stagingAccounts.map((account) => account.email))
    expect(phaseBReviewEmails).toEqual([
      'staging-owner@example.com',
      'staging-content@example.com',
      'staging-moderator@example.com',
      'staging-member@example.com',
    ])
  })
})
