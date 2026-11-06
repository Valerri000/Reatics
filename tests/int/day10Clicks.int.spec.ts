import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-b-click-list.md', 'utf8')

describe('Friday click list', () => {
  it('walks the public pages and the two sample records', () => {
    expect(note).toContain('https://18.118.84.127')
    expect(note).toContain('/featured')
    expect(note).toContain('/about')
    expect(note).toContain('/services')
    expect(note).toContain('/contact')
    expect(note).toContain('/blog/office-tour-notes?preview=1')
    expect(note).toContain('Draft preview')
    expect(note).toContain('/glossary/cap-rate')
    expect(note).toContain('/glendale')
    expect(note).toContain('/office')
    expect(note).toContain('/steps')
    expect(note).toContain('/scholarship')
    expect(note).toContain('301')
  })
})
