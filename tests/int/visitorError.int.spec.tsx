import { readFileSync } from 'node:fs'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import PublicError from '@/app/(frontend)/error'

describe('visitor errors', () => {
  it('shows a plain message and leaves the failure off the page', () => {
    render(<PublicError />)
    expect(screen.getByRole('heading', { name: 'Something went wrong' })).toBeTruthy()
    expect(screen.getByText('Please try again.')).toBeTruthy()
    const source = readFileSync('src/app/(frontend)/error.tsx', 'utf8')
    const globalSource = readFileSync('src/app/global-error.tsx', 'utf8')
    expect(source.includes('error.message')).toBe(false)
    expect(source.includes('error.digest')).toBe(false)
    expect(globalSource.includes('error.message')).toBe(false)
    expect(globalSource.includes('error.digest')).toBe(false)
  })
})
