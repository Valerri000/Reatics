import type { PayloadRequest } from 'payload'

import { publicPath, type PublicCollection } from '@/lib/paths'

type SlugDoc = { slug?: string | null }

export function redirectForSlugChange(
  collection: PublicCollection,
  previousSlug: unknown,
  nextSlug: unknown,
) {
  if (typeof previousSlug !== 'string' || typeof nextSlug !== 'string') return null
  const previous = previousSlug.trim()
  const next = nextSlug.trim()
  if (!previous || !next || previous === next) return null
  return {
    fromPath: publicPath(collection, previous),
    toPath: publicPath(collection, next),
    statusCode: 301 as const,
  }
}

export async function storeSlugRedirect({
  collection,
  doc,
  previousDoc,
  operation,
  req,
}: {
  collection: PublicCollection
  doc: SlugDoc
  previousDoc?: SlugDoc | null
  operation: string
  req: PayloadRequest
}) {
  if (operation !== 'update') return doc
  const change = redirectForSlugChange(collection, previousDoc?.slug, doc.slug)
  if (!change) return doc

  const existing = await req.payload.find({
    collection: 'redirects',
    where: { fromPath: { equals: change.fromPath } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
    req,
  })

  if (!existing.docs[0]) {
    await req.payload.create({
      collection: 'redirects',
      data: change,
      overrideAccess: true,
      req,
    })
  }

  return doc
}
