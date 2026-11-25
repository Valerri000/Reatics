import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { phaseDDay2Check } from '@/lib/phaseDDay2'

const note = readFileSync('docs/phase-d-day-2.md', 'utf8')

describe('phase D day 2', () => {
  it('matches the signup rules', () => {
    expect(phaseDDay2Check()).toEqual({
      paths: ['space-seeker', 'broker', 'owner', 'broker-owner', 'coworking'],
      seekerAsksDre: false,
      brokerAsksDre: true,
      ownerAsksDre: true,
      bothAsksDre: true,
      unvalidatedBrokerListed: false,
      validatedBrokerListed: true,
      unverifiedProviderPublic: false,
    })
    expect(note).toContain('broker and owner')
    expect(note).toContain('cannot appear as a public provider')
    expect(note).toContain('1-888-518-9168')
  })
})
