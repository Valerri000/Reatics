import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { billingStateLayout } from '@/lib/billingStateLayout'

describe('billing state layout', () => {
  it('uses one column on a phone and three columns on a desktop', () => {
    expect(billingStateLayout.phone).toContain('grid-cols-1')
    expect(billingStateLayout.desktop).toContain('md:grid-cols-3')
    const screen = readFileSync('src/components/billing/BillingStates.tsx', 'utf8')
    expect(screen).toContain('billingStateLayout.phone')
    expect(screen).toContain('billingStateLayout.desktop')
  })
})
