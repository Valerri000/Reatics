import { describe, expect, it } from 'vitest'

import { inBrokerDirectory } from '@/lib/directoryRule'

describe('broker directory rule', () => {
  it('lists a broker and owner only after the DRE is validated', () => {
    expect(
      inBrokerDirectory({ role: 'broker-owner', dreNumber: '01234567', dreValidated: false }),
    ).toBe(false)
    expect(inBrokerDirectory({ role: 'broker', dreNumber: '01234567', dreValidated: true })).toBe(true)
    expect(
      inBrokerDirectory({ role: 'broker-owner', dreNumber: '01234567', dreValidated: true }),
    ).toBe(true)
    expect(inBrokerDirectory({ role: 'owner', dreNumber: '01234567', dreValidated: true })).toBe(false)
    expect(inBrokerDirectory({ role: 'broker', dreNumber: '', dreValidated: true })).toBe(false)
  })
})
