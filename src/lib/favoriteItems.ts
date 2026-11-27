export type SavedListing = {
  id: string
  listingSlug: string
  title: string
  folderId: string | null
}

export function saveListing(items: SavedListing[], input: { listingSlug: string; title: string }) {
  if (!/^[a-z0-9-]{1,120}$/.test(input.listingSlug)) return items
  if (items.some((item) => item.listingSlug === input.listingSlug)) return items
  return [
    {
      id: `fav-${input.listingSlug}`,
      listingSlug: input.listingSlug,
      title: input.title.trim() || input.listingSlug,
      folderId: null,
    },
    ...items,
  ]
}

export function moveListing(items: SavedListing[], id: string, folderId: string | null) {
  return items.map((item) => (item.id === id ? { ...item, folderId } : item))
}

export function removeListing(items: SavedListing[], id: string) {
  return items.filter((item) => item.id !== id)
}
