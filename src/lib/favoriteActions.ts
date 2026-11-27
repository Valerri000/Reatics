'use server'

import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'

import { favoriteCopy } from '@/lib/favoriteCopy'
import { listingSlugFromHref } from '@/lib/favoriteSlug'
import config from '@/payload.config'

function relationId(value: unknown) {
  if (typeof value === 'number') return value
  if (value && typeof value === 'object' && 'id' in value && typeof (value as { id: unknown }).id === 'number') {
    return (value as { id: number }).id
  }
  return null
}

async function member() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })
  return { payload, user }
}

export async function saveListingFavorite(slug: string) {
  const listingSlug = listingSlugFromHref(`/listings/${slug}`)
  if (!listingSlug) return { ok: false as const, message: favoriteCopy.missing }
  const { payload, user } = await member()
  if (!user) return { ok: false as const, message: favoriteCopy.signIn }
  const listings = await payload.find({
    collection: 'listings',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: { slug: { equals: listingSlug } },
  })
  const listing = listings.docs[0]
  if (!listing) return { ok: false as const, message: favoriteCopy.missing }
  const existing = await payload.find({
    collection: 'favorites',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: {
      and: [{ user: { equals: user.id } }, { listing: { equals: listing.id } }],
    },
  })
  if (existing.docs[0]) return { ok: true as const, message: favoriteCopy.savedNotice }
  await payload.create({
    collection: 'favorites',
    overrideAccess: true,
    data: {
      listing: listing.id,
      user: user.id,
    },
  })
  return { ok: true as const, message: favoriteCopy.savedNotice }
}

export async function createFavoriteFolder(name: string) {
  const clean = name.trim().slice(0, 80)
  if (!clean) return { ok: false as const, message: favoriteCopy.folders }
  const { payload, user } = await member()
  if (!user) return { ok: false as const, message: favoriteCopy.signIn }
  await payload.create({
    collection: 'favorite-folders',
    overrideAccess: true,
    data: {
      name: clean,
      user: user.id,
    },
  })
  return { ok: true as const, message: favoriteCopy.folderCreated }
}

export async function moveSavedListing(id: string, folderId: string) {
  const favoriteId = Number(id)
  if (!Number.isInteger(favoriteId)) return { ok: false as const, message: favoriteCopy.missing }
  const { payload, user } = await member()
  if (!user) return { ok: false as const, message: favoriteCopy.signIn }
  const found = await payload.find({
    collection: 'favorites',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: { id: { equals: favoriteId } },
  })
  const favorite = found.docs[0]
  if (!favorite || relationId(favorite.user) !== user.id) {
    return { ok: false as const, message: favoriteCopy.missing }
  }
  let folder: number | null = null
  if (folderId) {
    const folderNumber = Number(folderId)
    if (!Number.isInteger(folderNumber)) return { ok: false as const, message: favoriteCopy.folderMissing }
    const folders = await payload.find({
      collection: 'favorite-folders',
      depth: 0,
      limit: 1,
      overrideAccess: true,
      where: { id: { equals: folderNumber } },
    })
    const match = folders.docs[0]
    if (!match || relationId(match.user) !== user.id) {
      return { ok: false as const, message: favoriteCopy.folderMissing }
    }
    folder = folderNumber
  }
  await payload.update({
    collection: 'favorites',
    id: favoriteId,
    overrideAccess: true,
    data: { folder },
  })
  return { ok: true as const, message: favoriteCopy.moved }
}

export async function removeSavedListing(id: string) {
  const favoriteId = Number(id)
  if (!Number.isInteger(favoriteId)) return { ok: false as const, message: favoriteCopy.missing }
  const { payload, user } = await member()
  if (!user) return { ok: false as const, message: favoriteCopy.signIn }
  const found = await payload.find({
    collection: 'favorites',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: { id: { equals: favoriteId } },
  })
  const favorite = found.docs[0]
  if (!favorite || relationId(favorite.user) !== user.id) {
    return { ok: false as const, message: favoriteCopy.missing }
  }
  await payload.delete({
    collection: 'favorites',
    id: favoriteId,
    overrideAccess: true,
  })
  return { ok: true as const, message: favoriteCopy.removed }
}
