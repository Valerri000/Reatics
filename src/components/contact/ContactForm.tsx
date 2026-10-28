'use client'

import React, { useState } from 'react'

import { ContactFormPanel } from '@/components/contact/ContactFormPanel'
import { contactErrors, type ContactErrors, type ContactInput } from '@/lib/contactMessage'
import { sendContactMessage } from '@/lib/sendContactMessage'

const emptyValues: ContactInput = { name: '', email: '', message: '' }

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(emptyValues)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [sent, setSent] = useState(false)
  const [pending, setPending] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next = contactErrors(values)
    setErrors(next)
    if (next.name || next.email || next.message) return
    setPending(true)
    try {
      const result = await sendContactMessage(values)
      if (!result.ok) {
        setErrors(result.errors)
        return
      }
      setSent(true)
    } finally {
      setPending(false)
    }
  }

  return (
    <ContactFormPanel
      sent={sent}
      pending={pending}
      values={values}
      errors={errors}
      onChange={(field, value) => setValues((current) => ({ ...current, [field]: value }))}
      onSubmit={onSubmit}
    />
  )
}
