import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('billing lock', () => {
  it('keeps the Phase C unavailable page for a removed listing', () => {
    const note = readFileSync('docs/phase-d-day-3-billing.md', 'utf8')
    const view = readFileSync('src/components/listing/ListingView.tsx', 'utf8')
    const page = readFileSync('src/app/(frontend)/listings/[slug]/page.tsx', 'utf8')
    expect(note).toContain('Phase C')
    expect(note).toContain('This listing is no longer available.')
    expect(note).toContain('Do not add a second removed-listing page')
    expect(note).toContain('Active')
    expect(note).toContain('Past due')
    expect(note).toContain('Canceled')
    expect(note).toContain('three columns')
    expect(note).toContain('one column')
    expect(view).toContain('unavailableListing')
    expect(page).toContain('ListingView')
  })
})
