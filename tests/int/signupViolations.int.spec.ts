import { describe, expect, it } from 'vitest'

import { signupViolations } from '@/lib/signupViolations'

describe('signup violations', () => {
  it('blocks a paid role without a DRE and a provider without the referral', () => {
    expect(signupViolations({ role: 'broker', dreNumber: '' })).toEqual([
      { message: 'Enter your DRE number.', path: 'dreNumber' },
    ])
    expect(signupViolations({ role: 'owner', dreNumber: '  ' })).toEqual([
      { message: 'Enter your DRE number.', path: 'dreNumber' },
    ])
    expect(signupViolations({ role: 'broker-owner', dreNumber: '01234567' })).toEqual([])
    expect(signupViolations({ role: 'space-seeker' })).toEqual([])
    expect(signupViolations({ role: 'coworking', referralAccepted: false })).toEqual([
      { message: 'The referral agreement is required.', path: 'referralAccepted' },
    ])
  })
})
