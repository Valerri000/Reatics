import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const frames = readFileSync('docs/phase-c-day-7-frames.md', 'utf8')

describe('November 17 frames', () => {
  it('lists corrections for the listing page and the search screen', () => {
    expect(frames).toContain('Tuesday, November 17')
    expect(frames).toContain('Desktop')
    expect(frames).toContain('Tablet')
    expect(frames).toContain('Phone')
    expect(frames).toContain('listing page')
    expect(frames).toContain('search screen')
    expect(frames).toContain('priority order')
    expect(frames).toContain('No listings yet.')
    expect(frames).toContain('Favorites folders')
  })
})
