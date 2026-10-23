import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-a-review.md', 'utf8')

describe('phase A review', () => {
  it('gives Vee the link, the accounts, the diagram, and the walkthrough', () => {
    expect(note).toContain('https://18.118.84.127')
    expect(note).toContain('staging-owner@example.com')
    expect(note).toContain('staging-content@example.com')
    expect(note).toContain('staging-moderator@example.com')
    expect(note).toContain('staging-member@example.com')
    expect(note).toContain('Review-day9-shell')
    expect(note).toContain('docs/entity-diagram.md')
    expect(note).toContain('Homepage')
    expect(note).toContain('broker')
    expect(note).toContain('/listings/brand-glendale')
  })

  it('lists what still waits on the company email', () => {
    expect(note).toContain('company email')
    expect(note).toContain('GitHub')
    expect(note).toContain('Nothing else in this phase is waiting on the company email.')
    expect(note).not.toMatch(/^#/m)
  })
})
