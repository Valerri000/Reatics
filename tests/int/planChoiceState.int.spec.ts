import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { planChoiceState } from '@/lib/planChoiceState'

describe('plan choice state', () => {
  it('separates signed-out, signed-in, error, and success', () => {
    expect(planChoiceState({ signedIn: false })).toBe('signed-out')
    expect(planChoiceState({ signedIn: true })).toBe('signed-in')
    expect(planChoiceState({ signedIn: true, error: true })).toBe('error')
    expect(planChoiceState({ signedIn: true, success: true, error: true })).toBe('success')
    const source = readFileSync('src/lib/startPlanCheckout.ts', 'utf8')
    expect(source).toContain('redirect(created.url)')
    expect(source).not.toContain('card')
  })
})
