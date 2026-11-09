import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-c-frames.md', 'utf8')

describe('locked frames', () => {
  it('marks the current map and the split views', () => {
    expect(note).toContain('locked for build')
    expect(note).toContain('/map')
    expect(note).toContain('map tiles')
    expect(note).toContain('homepage search opens /map')
    expect(note).toContain('map-only')
    expect(note).toContain('desktop 1920')
    expect(note).toContain('tablet 768')
    expect(note).toContain('phone 320')
  })
})
