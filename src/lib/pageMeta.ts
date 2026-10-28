export type SeoFields = {
  title?: string | null
  pageTitle?: string | null
  metaDescription?: string | null
  robots?: string | null
  canonicalUrl?: string | null
  slug?: string | null
}

export function browserTitle(page: SeoFields) {
  const seo = page.pageTitle?.trim()
  if (seo) return seo
  const title = page.title?.trim()
  if (title) return title
  return 'Reatics'
}

export function metaDescription(page: SeoFields) {
  return page.metaDescription?.trim() || ''
}

export function canonicalUrl(page: SeoFields) {
  const canonical = page.canonicalUrl?.trim()
  if (canonical) return canonical
  const slug = page.slug?.trim()
  return slug ? `/${slug}` : ''
}

export function robotsIndex(page: SeoFields) {
  return page.robots !== 'noindex'
}

export function metadataFor(page: SeoFields) {
  const canonical = canonicalUrl(page)
  const description = metaDescription(page)
  return {
    title: browserTitle(page),
    description: description || undefined,
    alternates: canonical ? { canonical } : undefined,
    robots: robotsIndex(page)
      ? { index: true as const, follow: true as const }
      : { index: false as const, follow: true as const },
  }
}
