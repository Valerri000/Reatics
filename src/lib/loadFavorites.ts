import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'

import type { FavoriteFolder } from '@/lib/favoriteFolders'
import type { SavedListing } from '@/lib/favoriteItems'
import config from '@/payload.config'

function relationId(value: unknown) {
  if (typeof value === 'number') return value
  if (value && typeof value === 'object' && 'id' in value && typeof (value as { id: unknown }).id === 'number') {
    return (value as { id: number }).id
  }
  return null
}

export async function loadFavoriteBoard(): Promise<{
  signedIn: boolean
  folders: FavoriteFolder[]
  saved: SavedListing[]
}> {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })
  if (!user) return { signedIn: false, folders: [], saved: [] }
  const folders = await payload.find({
    collection: 'favorite-folders',
    depth: 0,
    limit: 100,
    overrideAccess: true,
    sort: '-createdAt',
    where: { user: { equals: user.id } },
  })
  const saved = await payload.find({
    collection: 'favorites',
    depth: 1,
    limit: 100,
    overrideAccess: true,
    sort: '-createdAt',
    where: { user: { equals: user.id } },
  })
  return {
    signedIn: true,
    folders: folders.docs.map((doc) => ({
      id: String(doc.id),
      name: doc.name,
      createdAt: doc.createdAt,
    })),
    saved: saved.docs.map((doc) => {
      const listing = doc.listing
      const title = listing && typeof listing === 'object' ? listing.title : 'Saved listing'
      const listingSlug = listing && typeof listing === 'object' ? listing.slug : ''
      const folder = relationId(doc.folder)
      return {
        id: String(doc.id),
        listingSlug: listingSlug || '',
        title: title || 'Saved listing',
        folderId: folder == null ? null : String(folder),
      }
    }),
  }
}
