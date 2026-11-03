export const legalPageSlugs = ['terms', 'privacy'] as const

export type LegalPageSlug = (typeof legalPageSlugs)[number]

export function isLegalPageSlug(slug: string): slug is LegalPageSlug {
  return (legalPageSlugs as readonly string[]).includes(slug)
}

export const legalPageSeeds = [
  {
    title: 'Terms',
    slug: 'terms' as const,
    status: 'draft' as const,
    robots: 'noindex' as const,
    sitemap: false,
    canonicalUrl: '/terms',
    pageTitle: 'Terms',
    h1: 'Terms',
    metaDescription: '',
    imageAlt: '',
    socialTitle: 'Terms',
    socialDescription: '',
  },
  {
    title: 'Privacy',
    slug: 'privacy' as const,
    status: 'draft' as const,
    robots: 'noindex' as const,
    sitemap: false,
    canonicalUrl: '/privacy',
    pageTitle: 'Privacy',
    h1: 'Privacy',
    metaDescription: '',
    imageAlt: '',
    socialTitle: 'Privacy',
    socialDescription: '',
  },
]

export function publishedLegalPage(slug: string, page: { status?: string | null } | null) {
  return isLegalPageSlug(slug) && page?.status === 'published'
}
