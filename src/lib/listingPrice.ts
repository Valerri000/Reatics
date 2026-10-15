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

export function formatRate(annual: number, period: 'year' | 'month') {
  const value = period === 'year' ? annual : annual / 12
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: period === 'year' ? 0 : 2,
  }).format(value)
  return period === 'year' ? `${formatted}/sq ft/year` : `${formatted}/sq ft/mo`
}
