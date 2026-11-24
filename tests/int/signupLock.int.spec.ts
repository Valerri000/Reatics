import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-d-day-2-signup.md', 'utf8')

describe('signup lock', () => {
  it('locks the five paths, the errors, and the phone and desktop columns', () => {
    expect(note).toContain('Space seeker')
    expect(note).toContain('Broker and owner')
    expect(note).toContain('Coworking provider')
    expect(note).toContain('Empty required fields show an error')
    expect(note).toContain('Desktop uses two columns')
    expect(note).toContain('Phone uses one column')
    expect(note).toContain('1-888-518-9168')
  })
})
