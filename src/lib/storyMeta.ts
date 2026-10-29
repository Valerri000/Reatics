import { metadataFor, type SeoFields } from '@/lib/pageMeta'

export function storyMeta(
  record: SeoFields & {
    term?: string | null
    path: string
  },
) {
  return metadataFor({
    title: record.title || record.term,
    pageTitle: record.pageTitle,
    metaDescription: record.metaDescription,
    robots: record.robots,
    canonicalUrl: record.canonicalUrl?.trim() || record.path,
    slug: record.slug,
  })
}
