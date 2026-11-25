import type { AccountBillingStatus } from '@/lib/accountBilling'

export type ListingVisibilityInput = {
  kind?: string | null
  availability?: string | null
  subscriptionStatus?: AccountBillingStatus | string | null
  verified?: boolean | null
  published?: boolean | null
}

export function listingLeftPublic(input: ListingVisibilityInput) {
  if (input.availability === 'unavailable') return true
  if (input.kind === 'coworking') {
    if (input.published === false) return true
    if (input.verified === false) return true
    return false
  }
  return input.subscriptionStatus === 'canceled'
}
