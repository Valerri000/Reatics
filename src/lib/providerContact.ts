import { coworkingPhone, listingBroker, type ListingSource } from '@/lib/listingPage'

export function coworkingPublicContact(listing: ListingSource) {
  if (listing.kind !== 'coworking') return null
  return {
    phone: coworkingPhone,
    broker: listingBroker(listing),
  }
}
