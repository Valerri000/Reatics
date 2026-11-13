import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { listingContactPayload, listingContactReady } from '@/lib/listingContact'

const action = readFileSync('src/lib/sendListingContact.ts', 'utf8')

describe('listing contact', () => {
  it('stores the message on the listing and does not send mail', () => {
    const input = {
      name: 'Ada',
      email: 'ada@example.com',
      message: 'Is suite 200 open?',
      listing: '/listings/201-n-brand',
    }
    expect(listingContactReady(input)).toBe(true)
    expect(listingContactReady({ ...input, listing: '' })).toBe(false)
    expect(listingContactPayload(input).message).toContain('Listing: /listings/201-n-brand')
    expect(listingContactPayload(input).message).toContain('Is suite 200 open?')
    expect(action).toContain("collection: 'contact-messages'")
    expect(action).not.toContain('resend')
    expect(action).not.toContain('postmark')
  })
})
