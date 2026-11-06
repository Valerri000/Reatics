import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-b-walkthrough.md', 'utf8')

describe('review walkthrough', () => {
  it('walks the homepage, About, a post, a term, Glendale, and Office', () => {
    expect(note).toContain('https://18.118.84.127')
    expect(note).toContain('Homepage')
    expect(note).toContain('/about')
    expect(note).toContain('/blog/office-tour-notes?preview=1')
    expect(note).toContain('Draft preview')
    expect(note).toContain('/glossary')
    expect(note).toContain('/glendale')
    expect(note).toContain('/office')
    expect(note).toContain('Map search')
    expect(note).toContain('Stripe')
  })
})
