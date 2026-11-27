import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { favoriteCopy } from '@/lib/favoriteCopy'

describe('favorite report', () => {
  it('keeps the printable favorites report as a label', () => {
    expect(favoriteCopy.print).toBe('Print favorites')
    expect(favoriteCopy.estimated).toBe('Estimated before it is added.')
    const source = readFileSync('src/lib/favoriteCopy.ts', 'utf8')
    expect(source).not.toMatch(/pdf|price|window\.print/i)
  })
})
