import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-c-day-9-clicks.md', 'utf8')

describe('day 9 click list', () => {
  it('names the URL, the accounts, the clicks, and what is not built', () => {
    expect(note).toContain('https://18.118.84.127')
    expect(note).toContain('Review-day9-shell')
    expect(note).toContain('staging-owner@example.com')
    expect(note).toContain('/listings/201-n-brand')
    expect(note).toContain('/glendale')
    expect(note).toContain('/map?city=Glendale')
    expect(note).toContain('homepage search')
    expect(note).toContain('off the map and the sitemap')
    expect(note).toContain('Stripe subscriptions')
    expect(note).toContain('Favorites folders')
    expect(note).toContain('Terms and Privacy')
  })
})
