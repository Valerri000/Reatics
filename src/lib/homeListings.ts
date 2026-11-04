export const emptyFeatured = 'No listings yet.'

export const homeListingLimit = 6

export function homeListingRecords<
  T extends { slug?: string | null; title?: string | null; robots?: string | null },
>(listings: T[]) {
  return listings
    .filter((listing) => listing.robots === 'index' && Boolean(listing.slug?.trim()) && Boolean(listing.title?.trim()))
    .slice(0, homeListingLimit)
}

export function featuredCardClass(index: number) {
  if (index >= 4) return 'hidden xl:block'
  if (index === 3) return 'hidden md:block'
  return ''
}
