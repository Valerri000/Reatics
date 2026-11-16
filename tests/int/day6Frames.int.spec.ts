import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const frames = readFileSync('docs/phase-c-day-6-frames.md', 'utf8')

describe('November 16 frames', () => {
  it('checks the search handoff and the featured empty state', () => {
    expect(frames).toContain('Desktop')
    expect(frames).toContain('Tablet')
    expect(frames).toContain('Phone')
    expect(frames).toContain('/map')
    expect(frames).toContain('Index')
    expect(frames).toContain('empty state')
    expect(frames).toContain('No listings yet.')
    expect(frames).toContain('sitemap')
    expect(frames).toContain('301')
  })
})
