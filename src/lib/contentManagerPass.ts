import { canPreviewDraft } from '@/lib/preview'
import type { RoleUser } from '@/lib/roles'
import { sharedSlugMessage } from '@/lib/slugConflict'
import { redirectForSlugChange } from '@/lib/slugRedirect'
import { includeInSitemap, sitemapPath } from '@/lib/sitemapRecord'
import { stagingAccounts } from '@/lib/stagingAccounts'

export const contentManagerEmail = 'staging-content@example.com'

export const day9Clicks = [
  { label: 'Homepage', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Glossary', href: '/glossary' },
  { label: 'Glendale', href: '/glendale' },
  { label: 'Office', href: '/office' },
  { label: 'Steps', href: '/steps' },
  { label: 'Scholarship', href: '/scholarship' },
] as const

const publishedCity = {
  collection: 'cities' as const,
  slug: 'glendale',
  status: 'published' as const,
  robots: 'index' as const,
}

export function contentManager() {
  return stagingAccounts.find((account) => account.email === contentManagerEmail) ?? null
}

export function citySlugRedirect(previousSlug: string, nextSlug: string) {
  return redirectForSlugChange('cities', previousSlug, nextSlug)
}

export function citySitemapPath(checked: boolean) {
  return sitemapPath({ ...publishedCity, sitemap: checked })
}

export function cityListedWhenChecked(checked: boolean) {
  return includeInSitemap({ ...publishedCity, sitemap: checked })
}

export function citySlugWarning() {
  return sharedSlugMessage(
    'glendale',
    { collection: 'cities', id: 2, slug: 'glendale' },
    [{ collection: 'pages', id: 1, slug: 'glendale' }],
  )
}

export function draftPostPreview(user: RoleUser, slug: string) {
  return {
    path: `/blog/${slug}?preview=1`,
    allowed: canPreviewDraft(user, true),
    line: 'Draft preview',
  }
}
