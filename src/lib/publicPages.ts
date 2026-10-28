export const publicPageSlugs = ['about', 'services', 'contact', 'scholarship', 'steps'] as const

export type PublicPageSlug = (typeof publicPageSlugs)[number]

export const publicPageTitles: Record<PublicPageSlug, string> = {
  about: 'About Us',
  services: 'Services',
  contact: 'Contact Us',
  scholarship: 'Scholarship',
  steps: 'Steps to Renting an Office Space',
}

export function isPublicPageSlug(slug: string): slug is PublicPageSlug {
  return (publicPageSlugs as readonly string[]).includes(slug)
}
