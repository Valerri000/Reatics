export type ListingKind = 'sale' | 'lease' | 'coworking'

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function formatListingPrice(kind: ListingKind, amount: number | null) {
  if (amount == null) return 'Price on request.'
  const formatted = money.format(amount)
  if (kind === 'sale') return formatted
  return `${formatted}/mo`
}
