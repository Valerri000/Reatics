import { formatListingPrice, type ListingKind } from '@/lib/listingPrice'
import { listingMainPhoto, listingThumbs } from '@/lib/pageImages'
import { metadataFor } from '@/lib/pageMeta'
import { listingCityLine } from '@/lib/placeList'

export const unavailableListing = 'This listing is no longer available.'

export const coworkingPhone = '1-888-518-9168'

const transactionLabels: Record<ListingKind, string> = {
  sale: 'For Sale',
  lease: 'For Lease',
  coworking: 'Coworking',
}

export type ListingSource = {
  id?: number | null
  title?: string | null
  slug?: string | null
  kind: ListingKind
  price?: number | null
  street?: string | null
  city?: string | null
  state?: string | null
  postalCode?: string | null
  propertyType?: string | null
  squareFootage?: number | null
  county?: string | null
  description?: string | null
  availability?: string | null
  brokerName?: string | null
  brokerCompany?: string | null
  brokerPhone?: string | null
  brokerEmail?: string | null
  imageUrl?: string | null
  imageAlt?: string | null
  availabilities?: unknown
  pageTitle?: string | null
  metaDescription?: string | null
  robots?: string | null
  canonicalUrl?: string | null
  h1?: string | null
  sitemap?: boolean | null
}

export type ListingFact = {
  label: string
  value: string
}

export type ListingAvailabilityRow = {
  status: string
  floor: string
  suite: string
  squareFeet: string
  use: string
  term: string
  price: string
}

export type PublicBroker = {
  name: string
  company: string
  phone: string
  email: string
}

export function listingUnavailable(listing: { availability?: string | null }) {
  return listing.availability === 'unavailable'
}

export function listingRobots(listing: { availability?: string | null; robots?: string | null }) {
  if (listingUnavailable(listing)) return 'noindex'
  return listing.robots === 'noindex' ? 'noindex' : 'index'
}

export function listingOnMap(listing: { availability?: string | null }) {
  return !listingUnavailable(listing)
}

export function listingOnSitemap(listing: {
  availability?: string | null
  robots?: string | null
  sitemap?: boolean | null
  slug?: string | null
}) {
  if (listingUnavailable(listing)) return false
  const slug = listing.slug?.trim()
  if (!slug) return false
  if (listing.robots === 'noindex') return false
  return listing.sitemap === true
}

export function transactionLabel(kind: ListingKind) {
  return transactionLabels[kind]
}

export function listingH1(listing: ListingSource) {
  return listing.h1?.trim() || listing.title?.trim() || ''
}

export function listingAddress(listing: ListingSource) {
  const street = listing.street?.trim() || ''
  const cityLine = listingCityLine(listing)
  return [street, cityLine].filter(Boolean).join(', ')
}

export function listingPriceText(listing: ListingSource) {
  return formatListingPrice(listing.kind, listing.price ?? null)
}

export function listingDescription(listing: ListingSource) {
  return listing.description?.trim() || ''
}

export function listingFacts(listing: ListingSource) {
  const facts: ListingFact[] = []
  if (typeof listing.squareFootage === 'number' && Number.isFinite(listing.squareFootage)) {
    facts.push({ label: 'Square footage', value: formatCount(listing.squareFootage) })
  }
  if (listing.propertyType?.trim()) facts.push({ label: 'Property type', value: listing.propertyType.trim() })
  if (listing.county?.trim()) facts.push({ label: 'County', value: listing.county.trim() })
  return facts
}

export function listingPhoto(listing: ListingSource) {
  return listing.imageUrl?.trim() || listingMainPhoto
}

export function listingGallery() {
  return [...listingThumbs]
}

export function readAvailabilities(value: unknown): ListingAvailabilityRow[] {
  if (!Array.isArray(value)) return []
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object') return []
    const row = item as Record<string, unknown>
    const next = {
      status: text(row.status),
      floor: text(row.floor),
      suite: text(row.suite),
      squareFeet: numberText(row.squareFeet),
      use: text(row.use),
      term: text(row.term),
      price: numberText(row.pricePerSquareFoot),
    }
    if (!Object.values(next).some(Boolean)) return []
    return [next]
  })
}

export function listingBroker(listing: ListingSource): PublicBroker | null {
  if (listing.kind === 'coworking') return null
  const broker = {
    name: listing.brokerName?.trim() || '',
    company: listing.brokerCompany?.trim() || '',
    phone: listing.brokerPhone?.trim() || '',
    email: listing.brokerEmail?.trim() || '',
  }
  if (!broker.name && !broker.company && !broker.phone && !broker.email) return null
  return broker
}

export function publicListing(listing: ListingSource) {
  const slug = listing.slug?.trim() || ''
  return {
    id: listing.id ?? null,
    slug,
    h1: listingH1(listing),
    price: listingPriceText(listing),
    address: listingAddress(listing),
    description: listingDescription(listing),
    transaction: transactionLabel(listing.kind),
    facts: listingFacts(listing),
    photo: listingPhoto(listing),
    photoAlt: listing.imageAlt?.trim() || listingH1(listing),
    thumbs: listingGallery(),
    availabilities: readAvailabilities(listing.availabilities),
    broker: listingBroker(listing),
    coworking: listing.kind === 'coworking',
    phone: coworkingPhone,
    unavailable: listingUnavailable(listing),
  }
}

export type PublicListing = ReturnType<typeof publicListing>

export function listingMeta(listing: ListingSource) {
  const slug = listing.slug?.trim() || ''
  return metadataFor({
    title: listing.title,
    pageTitle: listing.pageTitle,
    metaDescription: listing.metaDescription,
    robots: listingRobots(listing),
    canonicalUrl: listing.canonicalUrl?.trim() || (slug ? '/listings/' + slug : ''),
    slug,
  })
}

function text(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function numberText(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Number.isInteger(value) ? formatCount(value) : String(value)
  }
  return text(value)
}

function formatCount(value: number) {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
