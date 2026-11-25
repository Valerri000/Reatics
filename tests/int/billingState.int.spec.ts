import { describe, expect, it } from 'vitest'

import { brokerBillingStates } from '@/lib/billingState'
import { billingStateCopy } from '@/lib/billingStateCopy'

describe('billing states', () => {
  it('names active, past due, and canceled', () => {
    expect([...brokerBillingStates]).toEqual(['active', 'past_due', 'canceled'])
    expect(billingStateCopy.active.label).toBe('Active')
    expect(billingStateCopy.past_due.label).toBe('Past due')
    expect(billingStateCopy.canceled.label).toBe('Canceled')
    expect(billingStateCopy.canceled.detail).toContain('sitemap')
  })
})
