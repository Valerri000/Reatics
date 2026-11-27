'use client'

import { favoriteCopy } from '@/lib/favoriteCopy'
import { listingSlugFromHref } from '@/lib/favoriteSlug'

export async function saveHeart(href: string) {
  const slug = listingSlugFromHref(href)
  if (!slug) return { ok: false as const, message: favoriteCopy.missing }
  const { saveListingFavorite } = await import('@/lib/favoriteActions')
  return saveListingFavorite(slug)
}
