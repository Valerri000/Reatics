import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const frames = readFileSync('docs/phase-c-map-frames.md', 'utf8')

describe('map frames', () => {
  it('covers the split view, map-only, and the empty state', () => {
    expect(frames).toContain('split view')
    expect(frames).toContain('map-only')
    expect(frames).toContain('No listings yet.')
    expect(frames).toContain('Desktop is 1920')
    expect(frames).toContain('Tablet is 768')
    expect(frames).toContain('Phone is 320')
  })
})
