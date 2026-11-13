import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-c-day-5.md', 'utf8')

describe('November 13 map checks', () => {
  it('records the hover pair, the phone, and the shared map', () => {
    expect(note).toContain('Friday, November 13')
    expect(note).toContain('enlarges its pin')
    expect(note).toContain('1-888-518-9168')
    expect(note).toContain('opens the sign-in modal')
    expect(note).toContain('stores a message')
    expect(note).toContain('Resend or Postmark')
    expect(note).toContain('/map')
    expect(note).toContain('Midday check')
  })
})
