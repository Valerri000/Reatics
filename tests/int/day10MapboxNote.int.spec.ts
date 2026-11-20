import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { mapboxNoteReady } from '@/lib/phaseCMilestone'

const note = readFileSync('docs/phase-c-day-7-mapbox.md', 'utf8')

describe('mapbox charge note', () => {
  it('keeps the planning range in the repository', () => {
    expect(mapboxNoteReady()).toBe(true)
    expect(note).toContain('$0 to $50')
    expect(note).toContain('$150 to $400')
    expect(note).not.toContain('pk.')
  })
})
