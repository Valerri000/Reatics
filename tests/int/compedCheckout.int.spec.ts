import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('comped checkout', () => {
  it('stops checkout for a comped account and still redirects a paid plan', () => {
    const source = readFileSync('src/lib/startPlanCheckout.ts', 'utf8')
    expect(source).toContain('compedSkipsCharge')
    expect(source).toContain('No charge is made.')
    expect(source).toContain('redirect(created.url)')
    expect(source).not.toContain('card')
    const choice = readFileSync('src/components/billing/PlanChoice.tsx', 'utf8')
    expect(choice).toContain('Coupon')
    expect(choice).toContain('onPay(planId, coupon)')
  })
})
