import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const frames = readFileSync('docs/phase-c-listing-frames.md', 'utf8')
const note = readFileSync('docs/phase-c-day-2.md', 'utf8')

describe('listing frames', () => {
  it('covers desktop, phone, the unavailable URL, and the report states', () => {
    expect(frames).toContain('Phase A frame')
    expect(frames).toContain('Desktop')
    expect(frames).toContain('Phone')
    expect(frames).toContain('/listings/{slug}')
    expect(frames).toContain('empty state')
    expect(frames).toContain('error state')
    expect(frames).toContain('successful send')
    expect(note).toContain('This listing is no longer available')
    expect(note).toContain('1-888-518-9168')
    expect(note).toContain('Phase D')
  })
})
