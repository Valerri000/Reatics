import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const frames = readFileSync('docs/phase-c-day-5-frames.md', 'utf8')

describe('day 5 frames', () => {
  it('checks the hover pair and leaves alert as a label', () => {
    expect(frames).toContain('hover pair')
    expect(frames).toContain('coworking card')
    expect(frames).toContain('city-to-map')
    expect(frames).toContain('Desktop')
    expect(frames).toContain('Tablet')
    expect(frames).toContain('Phone')
    expect(frames).toContain('Save, alert, and send')
    expect(frames).toContain('Resend or Postmark')
  })
})
