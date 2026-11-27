import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { phaseDDay5Check } from '@/lib/phaseDDay5'

describe('phase D day 5', () => {
  it('checks signup, the test plan, and a saved folder', () => {
    const check = phaseDDay5Check()
    expect(check.signup).toEqual(['space-seeker', 'broker', 'owner', 'broker-owner', 'coworking'])
    expect(check.planCents).toBe(12900)
    expect(check.signedInSaves).toBe(true)
    expect(check.signedOutSignIn).toBe(true)
    expect(check.folder).toBe('Monday review')
    expect(check.print).toBe('Print favorites')
    expect(check.estimated).toBe('Estimated before it is added.')
    const note = readFileSync('docs/phase-d-day-5-check.md', 'utf8')
    expect(note).toContain('$129')
    expect(note).toContain('saved folder')
    expect(note).toContain('does not start a charge')
  })
})
