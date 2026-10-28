'use server'

import { getPayload } from 'payload'

import { contactErrors, contactPayload, type ContactInput } from '@/lib/contactMessage'
import config from '@/payload.config'

export async function sendContactMessage(input: ContactInput) {
  const errors = contactErrors(input)
  if (errors.name || errors.email || errors.message) {
    return { ok: false as const, errors }
  }
  const payload = await getPayload({ config })
  await payload.create({
    collection: 'contact-messages',
    data: contactPayload(input),
    overrideAccess: false,
  })
  return { ok: true as const }
}
