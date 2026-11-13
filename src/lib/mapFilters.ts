import { pointInArea, type AreaPoint } from '@/lib/mapArea'

export const saleTypes = [
  'Office',
  'Retail',
  'Industrial/flex',
  'Land',
  'Medical',
  'Shopping center',
  'Multi-family',
  'Other',
] as const

export const leaseTypes = ['Office', 'Retail', 'Industrial', 'Flex', 'Medical', 'Land'] as const

export const coworkingTypes = ['1–2', '3–4', '5–10', '11–20', '25+'] as const

export const launchFilters = ['kind', 'propertyType', 'price', 'squareFootage', 'keywords', 'place'] as const

export const recordOnlyFields = ['lotSize', 'capRate', 'yearBuilt', 'units', 'listingCode'] as const

export type MapFilters = {
  kind: '' | 'sale' | 'lease' | 'coworking'
  propertyType: string
  priceMin: string
  priceMax: string
  squareFootageMin: string
  squareFootageMax: string
  keywords: string
  place: string
}

export type MapListing = {
  href?: string
  slug?: string
  kind?: string | null
  price?: number | null
  propertyType?: string | null
  squareFootage?: number | null
  keywords?: string | null
  title?: string | null
  street?: string | null
  city?: string | null
  state?: string | null
  county?: string | null
  postalCode?: string | null
  cityLine?: string | null
  latitude?: number | null
  longitude?: number | null
}

export function emptyMapFilters(): MapFilters {
  return {
    kind: '',
    propertyType: '',
    priceMin: '',
    priceMax: '',
    squareFootageMin: '',
    squareFootageMax: '',
    keywords: '',
    place: '',
  }
}

export function typesForKind(kind: MapFilters['kind']): string[] {
  if (kind === 'sale') return [...saleTypes]
  if (kind === 'lease') return [...leaseTypes]
  if (kind === 'coworking') return [...coworkingTypes]
  return []
}

export function chooseKind(filters: MapFilters, kind: MapFilters['kind']): MapFilters {
  const propertyType = typesForKind(kind).some((option) => normalizeKey(option) === normalizeKey(filters.propertyType))
    ? filters.propertyType
    : ''
  return { ...filters, kind, propertyType }
}

export function filtersFromQuery(query: {
  place?: string
  city?: string
  kind?: string
  type?: string
  use?: string
  priceMin?: string
  priceMax?: string
  sqftMin?: string
  sqftMax?: string
  keywords?: string
}): MapFilters {
  const kind = query.kind === 'sale' || query.kind === 'lease' || query.kind === 'coworking' ? query.kind : ''
  const requested = (query.type || (query.use && query.use !== 'all' ? query.use : '') || '').trim()
  return {
    ...emptyMapFilters(),
    kind,
    propertyType: matchType(kind, requested),
    place: (query.city || query.place || '').trim(),
    priceMin: query.priceMin || '',
    priceMax: query.priceMax || '',
    squareFootageMin: query.sqftMin || '',
    squareFootageMax: query.sqftMax || '',
    keywords: query.keywords || '',
  }
}

export function filterMapListings<T extends MapListing>(listings: T[], filters: MapFilters, area: AreaPoint[] = []) {
  return listings.filter((listing) => listingMatches(listing, filters, area))
}

export function normalizeKey(value: string) {
  return value.toLowerCase().replace(/[–—-]/g, '-').replace(/\s+/g, '')
}

function matchType(kind: MapFilters['kind'], requested: string) {
  if (!requested) return ''
  const lists = kind ? [typesForKind(kind)] : [saleTypes, leaseTypes, coworkingTypes]
  for (const list of lists) {
    const found = list.find((option) => normalizeKey(option) === normalizeKey(requested))
    if (found) return found
  }
  return ''
}

function listingMatches(listing: MapListing, filters: MapFilters, area: AreaPoint[]) {
  if (filters.kind && listing.kind !== filters.kind) return false
  if (filters.propertyType && normalizeKey(listing.propertyType || '') !== normalizeKey(filters.propertyType)) return false
  if (!within(listing.price, filters.priceMin, filters.priceMax)) return false
  if (!within(listing.squareFootage, filters.squareFootageMin, filters.squareFootageMax)) return false
  if (!keywordMatches(listing, filters.keywords)) return false
  if (!placeMatches(listing, filters.place)) return false
  if (area.length >= 3) {
    if (listing.latitude == null || listing.longitude == null) return false
    if (!pointInArea({ latitude: listing.latitude, longitude: listing.longitude }, area)) return false
  }
  return true
}

function within(value: number | null | undefined, min: string, max: string) {
  const low = bound(min)
  const high = bound(max)
  if (low == null && high == null) return true
  if (value == null || !Number.isFinite(value)) return false
  if (low != null && value < low) return false
  if (high != null && value > high) return false
  return true
}

function bound(value: string) {
  const text = value.trim().replace(/[$,]/g, '')
  if (!text) return null
  const number = Number(text)
  return Number.isFinite(number) ? number : null
}

function keywordMatches(listing: MapListing, keywords: string) {
  const words = keywords.toLowerCase().split(/\s+/).filter(Boolean)
  if (words.length === 0) return true
  const haystack = [listing.keywords, listing.title, listing.propertyType, listing.street, listing.cityLine]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return words.every((word) => haystack.includes(word))
}

function placeMatches(listing: MapListing, place: string) {
  const needle = place.trim().toLowerCase()
  if (!needle) return true
  const haystack = [listing.city, listing.state, listing.county, listing.postalCode, listing.street, listing.cityLine, listing.title]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return haystack.includes(needle)
}
