import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const note = readFileSync(resolve(process.cwd(), 'docs/security.md'), 'utf8')

describe('security note', () => {
  it('covers how a person is deleted', () => {
    expect(note).toContain('password')
    expect(note).toContain('audit')
    expect(note).toContain('Owner')
    expect(note).toContain('delete')
    expect(note).toContain('30 days')
    expect(note).toContain('company member')
    expect(note).toContain('deal participant')
  })
})
