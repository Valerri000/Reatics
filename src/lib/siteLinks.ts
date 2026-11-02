import { menuLinks } from '@/lib/navigation'

export const headerLinks = menuLinks

export const headerUtilityLinks = [{ href: '/brokers', label: 'Find a broker' }] as const

export const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/featured', label: 'Featured properties' },
  { href: '/about', label: 'About us' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/scholarship', label: 'Scholarship' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/steps', label: 'Steps to renting' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
] as const

export const footerAreaLinks = [
  { href: '/coworking', label: 'Coworking spaces' },
  { href: '/commercial', label: 'Commercial real estate' },
] as const

const liveRoutes = new Set<string>([
  '/',
  '/about',
  '/services',
  '/contact',
  '/blog',
  '/featured',
  '/coworking',
  '/commercial',
  '/scholarship',
  '/glossary',
  '/steps',
  '/privacy',
  '/terms',
  '/brokers',
])

export function offRouteLinks(links: readonly { href: string }[]) {
  return links.filter((link) => !liveRoutes.has(link.href)).map((link) => link.href)
}
