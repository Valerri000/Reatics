import type { AccountUser } from '@/lib/account'

export function canList(user: AccountUser | null) {
  if (!user?.role) return false
  if (user.role === 'broker' || user.role === 'owner' || user.role === 'broker-owner') return true
  return user.role === 'coworking' && Boolean(user.verified)
}

export function accountLinks(user: AccountUser | null) {
  const links = [
    { href: '/account/profile', label: 'My profile' },
    { href: '/account/favorites', label: 'Favorites' },
    { href: '/account/searches', label: 'Searches' },
    { href: '/account/alerts', label: 'Alerts' },
  ]

  if (!user?.role || user.role === 'space-seeker') {
    links.push({ href: '/account/saved-brokers', label: 'Saved brokers' })
  }

  if (
    user?.role === 'broker' ||
    user?.role === 'owner' ||
    user?.role === 'broker-owner' ||
    (user?.role === 'coworking' && user.verified)
  ) {
    links.push({ href: '/account/listings', label: 'My listings' })
  }

  if (user?.role === 'broker' || user?.role === 'owner' || user?.role === 'broker-owner') {
    links.push({ href: '/account/inquiries', label: 'Inquiries' })
  }

  return links
}
