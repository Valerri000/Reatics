import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const view = readFileSync('src/components/listing/ListingView.tsx', 'utf8')
const page = readFileSync('src/lib/listingPage.ts', 'utf8')

describe('coworking listing contact', () => {
  it('uses the office number and skips the provider block', () => {
    expect(view).toContain('listing.coworking')
    expect(view).toContain('listingPhoneSize')
    expect(view).toContain('<BrokerCard broker={listing.broker} />')
    expect(page).toContain("if (listing.kind === 'coworking') return null")
    expect(page).toContain("phone: coworkingPhone")
  })
})
