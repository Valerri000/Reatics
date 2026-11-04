import { publicPath, type PublicCollection } from '@/lib/paths'

export const sitemapCollections = ['pages', 'posts', 'glossary', 'cities', 'property-types'] as const

export type SitemapCollection = (typeof sitemapCollections)[number]

export type SitemapRecord = {
  collection: SitemapCollection
  slug?: string | null
  status?: string | null
  robots?: string | null
  sitemap?: boolean | null
}

export function includeInSitemap(record: SitemapRecord) {
  const slug = record.slug?.trim()
  if (!slug) return false
  if (record.collection === 'pages' && slug === 'home') return false
  if (record.status !== 'published') return false
  if (record.robots !== 'index') return false
  if (record.sitemap !== true) return false
  return true
}

export function sitemapPath(record: SitemapRecord) {
  if (!includeInSitemap(record)) return null
  return publicPath(record.collection as PublicCollection, record.slug!.trim())
}
