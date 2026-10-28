import React from 'react'

import { ContactForm } from '@/components/contact/ContactForm'
import { PhoneNumber } from '@/components/PhoneNumber'
import { contactAddress } from '@/lib/contactDetails'

export function ContactDetails() {
  return (
    <div className="mt-10">
      <p className="m-0 text-base font-semibold text-ink">
        {contactAddress[0]}
        <br />
        {contactAddress[1]}
      </p>
      <p className="m-0 mt-4">
        <PhoneNumber />
      </p>
      <ContactForm />
    </div>
  )
}
