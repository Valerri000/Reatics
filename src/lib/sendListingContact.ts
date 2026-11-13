'use server'

import { getPayload } from 'payload'

import { listingContactErrors, listingContactPayload, listingContactReady, type ListingContactInput } from '@/lib/listingContact'
import config from '@/payload.config'

export async function sendListingContact(input: ListingContactInput) {
  const errors = listingContactErrors(input)
  if (!listingContactReady(input)) return { ok: false as const, errors }
  const payload = await getPayload({ config })
  await payload.create({
    collection: 'contact-messages',
    data: listingContactPayload(input),
    overrideAccess: false,
  })
  return { ok: true as const }
}
