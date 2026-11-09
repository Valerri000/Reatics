import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('map token', () => {
  it('keeps the staging token out of the repository', () => {
    const example = readFileSync('.env.example', 'utf8')
    const note = readFileSync('docs/phase-c-mapbox.md', 'utf8')
    expect(example).toContain('MAPBOX_TOKEN=')
    expect(example.split('MAPBOX_TOKEN=')[1]?.split('\n')[0]?.trim() ?? '').toBe('')
    expect(note).toContain('company name')
    expect(note).toContain('not in the repository')
    expect(note).not.toMatch(/pk\./)
  })
})
