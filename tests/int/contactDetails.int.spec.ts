import { describe, expect, it } from 'vitest'

import { contactAddress, contactPhone, showsContactDetails } from '@/lib/contactDetails'

describe('contact details', () => {
  it('shows the office address and phone on the contact page', () => {
    expect(showsContactDetails('contact')).toBe(true)
    expect(showsContactDetails('about')).toBe(false)
    expect(contactAddress).toEqual(['201 N Brand Suite 200', 'Glendale CA, 91203'])
    expect(contactPhone).toBe('1-888-518-9168')
  })
})
