import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/staging-review.md', 'utf8')

describe('staging review', () => {
  it('names the samples, the accounts, and what is not built', () => {
    expect(note).toContain('https://18.118.84.127')
    expect(note).toContain('201-n-brand')
    expect(note).toContain('glendale')
    expect(note).toContain('staging-owner@example.com')
    expect(note).toContain('staging-content@example.com')
    expect(note).toContain('staging-moderator@example.com')
    expect(note).toContain('staging-member@example.com')
    expect(note).toContain('Review-day9-shell')
    expect(note).toContain('Map search')
    expect(note).toContain('Stripe')
  })
})
