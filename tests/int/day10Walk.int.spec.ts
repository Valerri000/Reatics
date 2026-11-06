import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-b-walkthrough.md', 'utf8')

describe('Friday walkthrough', () => {
  it('names the featured cards and the logo', () => {
    expect(note).toContain('design samples')
    expect(note).toContain('/logo.png')
    expect(note).toContain('/about')
    expect(note).toContain('/glendale')
    expect(note).toContain('/office')
    expect(note).toContain('Terms and Privacy stay unpublished')
  })
})
