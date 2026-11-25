import { listingUnavailable } from '@/lib/listingPage'
import { publicPath, type PublicCollection } from '@/lib/paths'

export const sitemapCollections = ['pages', 'posts', 'glossary', 'cities', 'property-types', 'listings'] as const

export type SitemapCollection = (typeof sitemapCollections)[number]

export type SitemapRecord = {
  collection: SitemapCollection
  slug?: string | null
  status?: string | null
  robots?: string | null
  sitemap?: boolean | null
  availability?: string | null
  kind?: string | null
  subscriptionStatus?: string | null
  verified?: boolean | null
  published?: boolean | null
}

export function includeInSitemap(record: SitemapRecord) {
  const slug = record.slug?.trim()
  if (!slug) return false
  if (record.collection === 'pages' && slug === 'home') return false
  if (record.collection === 'listings') {
    if (listingUnavailable(record)) return false
  } else if (record.status !== 'published') return false
  if (record.robots !== 'index') return false
  if (record.sitemap !== true) return false
  return true
}

export function publicSitemapPaths(paths: string[]) {
  return [...new Set(paths)].filter((path) => path !== '/map').sort()
}

export function sitemapPath(record: SitemapRecord) {
  if (!includeInSitemap(record)) return null
  return publicPath(record.collection as PublicCollection, record.slug!.trim())
}
