import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const frames = readFileSync('docs/phase-c-day-8-frames.md', 'utf8')

describe('day 8 frames', () => {
  it('reviews desktop, tablet, and phone', () => {
    expect(frames).toContain('Wednesday, November 18')
    expect(frames).toContain('Desktop')
    expect(frames).toContain('Tablet')
    expect(frames).toContain('Phone')
    expect(frames).toContain('28px')
    expect(frames).toContain('40px')
    expect(frames).toContain('21px')
    expect(frames).toContain('1-888-518-9168')
    expect(frames).toContain('No listings yet.')
    expect(frames).toContain('drawn area can be cleared')
    expect(frames).toContain('do not make a new geocoding call')
  })
})
