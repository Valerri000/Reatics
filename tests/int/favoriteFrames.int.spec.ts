import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('favorite frames', () => {
  it('records the Monday favorites frames', () => {
    const frames = readFileSync('docs/phase-d-day-5-frames.md', 'utf8')
    expect(frames).toContain('## Empty')
    expect(frames).toContain('## Folders')
    expect(frames).toContain('## One saved listing')
    expect(frames).toContain('## Map heart')
    expect(frames).toContain('Monday review')
    expect(frames).toContain('Save listing')
  })
})
