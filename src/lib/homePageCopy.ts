export const homepageHeadline = 'Best-in-class commercial real estate search engine.'

export const homepageBrowserTitle = 'Reatics'

export const homepageDescription = 'Commercial real estate listings, brokers, and coworking.'

export const homepageSlug = 'home'

export const homepageSeed = {
  title: 'Homepage',
  slug: homepageSlug,
  status: 'draft' as const,
  h1: homepageHeadline,
  pageTitle: homepageBrowserTitle,
  metaDescription: homepageDescription,
  robots: 'index' as const,
  canonicalUrl: '/',
  sitemap: false,
  imageAlt: '',
  socialTitle: homepageBrowserTitle,
  socialDescription: homepageDescription,
}

type HomepageRecord = {
  status?: string | null
  h1?: string | null
  pageTitle?: string | null
  metaDescription?: string | null
} | null

export function homepageCopy(page: HomepageRecord) {
  return {
    headline: page?.h1?.trim() || homepageHeadline,
    title: page?.pageTitle?.trim() || homepageBrowserTitle,
    description: page?.metaDescription?.trim() || homepageDescription,
  }
}
