import { describe, expect, it } from 'vitest'

import { contactAddress, contactPhone, showsContactDetails } from '@/lib/contactDetails'

describe('contact details', () => {
  it('shows the office address and phone on the contact page', () => {
    expect(showsContactDetails('contact')).toBe(true)
    expect(showsContactDetails('about')).toBe(false)
    expect(contactAddress).toEqual(['16200 Ventura Blvd. Suite 428', 'Encino, CA 91436'])
    expect(contactPhone).toBe('1-888-518-9168')
  })
})
