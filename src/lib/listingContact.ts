import { contactErrors, contactPayload, contactReady, type ContactErrors, type ContactInput } from '@/lib/contactMessage'

export type ListingContactInput = ContactInput & {
  listing: string
}

export function listingContactErrors(input: ListingContactInput): ContactErrors & { listing?: string } {
  const errors = contactErrors(input)
  if (!input.listing.trim()) return { ...errors, listing: 'Choose a listing.' }
  return errors
}

export function listingContactReady(input: ListingContactInput) {
  const errors = listingContactErrors(input)
  return contactReady(input) && !errors.listing
}

export function listingContactPayload(input: ListingContactInput) {
  const payload = contactPayload(input)
  return {
    ...payload,
    message: `Listing: ${input.listing.trim()}\n${payload.message}`,
  }
}
