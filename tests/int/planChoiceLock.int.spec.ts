import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { planChoiceBreakpoints, planChoiceChargeOnReturn, planChoiceStates } from '@/lib/planChoiceLock'
import { planChoiceLayout } from '@/lib/planChoiceLayout'

const note = readFileSync('docs/phase-d-day-1-plans.md', 'utf8')

describe('plan choice lock', () => {
  it('locks the states for desktop and phone', () => {
    expect([...planChoiceStates]).toEqual(['signed-out', 'signed-in', 'error', 'success'])
    expect([...planChoiceBreakpoints]).toEqual(['desktop', 'phone'])
    expect(planChoiceChargeOnReturn).toBe(false)
    expect(planChoiceLayout.grid).toContain('grid-cols-1')
    expect(planChoiceLayout.grid).toContain('md:grid-cols-2')
    expect(planChoiceLayout.frame).toContain('px-inset-phone')
    expect(planChoiceLayout.frame).toContain('xl:px-inset-desktop')
    const screen = readFileSync('src/components/billing/PlanChoice.tsx', 'utf8')
    expect(screen).toContain('planChoiceLayout.grid')
    expect(screen).toContain('planChoiceLayout.frame')
    expect(note).toContain('Signed out')
    expect(note).toContain('Signed in')
    expect(note).toContain('Error')
    expect(note).toContain('Success')
    expect(note).toContain('Desktop uses two columns')
    expect(note).toContain('Phone uses one column')
  })
})
