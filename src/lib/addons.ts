export type AddonId =
  | 'featured-listing'
  | 'search-ad'
  | 'email-campaign'
  | 'credit-check-fee'
  | 'e-signature-fee'

export type Addon = {
  id: AddonId
  name: string
  active: false
  publicPurchase: false
}

export const addons: Addon[] = [
  { id: 'featured-listing', name: 'Featured listing', active: false, publicPurchase: false },
  { id: 'search-ad', name: 'Search ad', active: false, publicPurchase: false },
  { id: 'email-campaign', name: 'Email campaign', active: false, publicPurchase: false },
  { id: 'credit-check-fee', name: 'Credit-check fee', active: false, publicPurchase: false },
  { id: 'e-signature-fee', name: 'E-signature fee', active: false, publicPurchase: false },
]

export function addonById(id: string) {
  return addons.find((addon) => addon.id === id) ?? null
}
