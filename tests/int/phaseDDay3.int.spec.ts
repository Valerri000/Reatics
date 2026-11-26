import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { phaseDDay3Check } from '@/lib/phaseDDay3'

const note = readFileSync('docs/phase-d-day-3.md', 'utf8')

describe('phase D day 3', () => {
  it('matches the hide rule', () => {
    expect(phaseDDay3Check()).toEqual({
      statuses: ['active', 'past_due', 'canceled', 'comped'],
      brokerStates: ['active', 'past_due', 'canceled'],
      canceledHidden: true,
      pastDueVisible: true,
      compedVisible: true,
      activeVisible: true,
      coworkingExempt: true,
      coworkingRevoked: true,
      samePage: 'This listing is no longer available.',
      graceStored: true,
    })
    expect(note).toContain('broker and owner')
    expect(note).toContain('This listing is no longer available.')
    expect(note).toContain('Phase C')
    expect(note).toContain('not sent')
    expect(note).toContain('comped')
  })
})
