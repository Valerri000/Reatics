import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { billingChargeLabel, compedSkipsCharge, compedStaysVisible } from '@/lib/compedPlan'

describe('comped plan', () => {
  it('takes no charge, stays visible, and is labeled comped', () => {
    expect(compedSkipsCharge('comped')).toBe(true)
    expect(compedSkipsCharge('active')).toBe(false)
    expect(compedStaysVisible()).toBe(true)
    expect(billingChargeLabel('comped')).toBe('Comped')
    expect(billingChargeLabel('comped')).not.toBe('Cash')
    const screen = readFileSync('src/components/billing/BillingStates.tsx', 'utf8')
    expect(screen).toContain('Comped')
    expect(screen).not.toContain('Cash')
  })
})
