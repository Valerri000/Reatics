import { describe, expect, it } from 'vitest'

import { accountBillingStatus, accountBillingStatuses, statusFromSubscription } from '@/lib/accountBilling'

describe('account billing status', () => {
  it('stores active, past due, canceled, and comped', () => {
    expect([...accountBillingStatuses]).toEqual(['active', 'past_due', 'canceled', 'comped'])
    expect(accountBillingStatus('active')).toBe('active')
    expect(accountBillingStatus('past_due')).toBe('past_due')
    expect(accountBillingStatus('canceled')).toBe('canceled')
    expect(accountBillingStatus('comped')).toBe('comped')
    expect(accountBillingStatus('incomplete')).toBeNull()
    expect(statusFromSubscription('active')).toBe('active')
    expect(statusFromSubscription('past_due')).toBe('past_due')
    expect(statusFromSubscription('canceled')).toBe('canceled')
    expect(statusFromSubscription('incomplete')).toBeNull()
    expect(statusFromSubscription('comped')).toBeNull()
  })
})
