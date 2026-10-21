import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('visitor errors', () => {
  it('shows a plain message and leaves the failure off the page', () => {
    const source = readFileSync('src/app/(frontend)/error.tsx', 'utf8')
    const globalSource = readFileSync('src/app/global-error.tsx', 'utf8')
    expect(source).toContain('Something went wrong')
    expect(source).toContain('Please try again.')
    expect(source.includes('error.message')).toBe(false)
    expect(source.includes('error.digest')).toBe(false)
    expect(globalSource).toContain('Something went wrong')
    expect(globalSource.includes('error.message')).toBe(false)
    expect(globalSource.includes('error.digest')).toBe(false)
  })
})
