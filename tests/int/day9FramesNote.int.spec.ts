import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const frames = readFileSync('docs/phase-c-day-9-frames.md', 'utf8')

describe('day 9 frames', () => {
  it('records the last visual corrections', () => {
    expect(frames).toContain('Thursday, November 19')
    expect(frames).toContain('Desktop')
    expect(frames).toContain('Tablet')
    expect(frames).toContain('Phone')
    expect(frames).toContain('Glendale')
    expect(frames).toContain('Office')
    expect(frames).toContain('November 18')
    expect(frames).toContain('28px')
    expect(frames).toContain('40px')
    expect(frames).toContain('21px')
    expect(frames).toContain('View on the map')
  })
})
