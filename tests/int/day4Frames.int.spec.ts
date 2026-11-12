import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const frames = readFileSync('docs/phase-c-filter-frames.md', 'utf8')

describe('filter frames', () => {
  it('places the filters for desktop, tablet, and phone', () => {
    expect(frames).toContain('Desktop')
    expect(frames).toContain('Tablet')
    expect(frames).toContain('Phone')
    expect(frames).toContain('Draw area')
    expect(frames).toContain('clear all')
    expect(frames).toContain('sale, lease, or coworking')
    expect(frames).toContain('map stays mounted')
  })
})
