import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-b-review-note.md', 'utf8')

describe('review note', () => {
  it('gives Vee the staging link, the click list, and the walkthrough', () => {
    expect(note).toContain('https://18.118.84.127')
    expect(note).toContain('https://18.118.84.127/admin')
    expect(note).toContain('docs/phase-b-click-list.md')
    expect(note).toContain('docs/phase-b-walkthrough.md')
    expect(note).toContain('Terms copy')
    expect(note).toContain('Privacy copy')
    expect(note).toContain('GitHub transfer')
    expect(note).toContain('contact email sending')
  })
})
