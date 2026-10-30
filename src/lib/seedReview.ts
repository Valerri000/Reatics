import { sql } from '@payloadcms/db-postgres'
import type { Payload } from 'payload'

import { publicPageSeeds } from '@/lib/publicPageSeed'
import { sampleCity, sampleListing, sampleOffice, sampleRedirect } from '@/lib/samples'
import { sampleDraftPost, samplePost, sampleTerm } from '@/lib/storySeed'
import { stagingAccounts } from '@/lib/stagingAccounts'

export async function ensureSampleListing(payload: Payload) {
  const existing = await payload.find({
    collection: 'listings',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: { slug: { equals: sampleListing.slug } },
  })
  const current = existing.docs[0]
  if (current) {
    return payload.update({
      collection: 'listings',
      id: current.id,
      data: sampleListing,
      overrideAccess: true,
    })
  }
  return payload.create({
    collection: 'listings',
    data: sampleListing,
    overrideAccess: true,
  })
}

export async function ensureSampleCity(payload: Payload) {
  const page = await payload.find({
    collection: 'pages',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: { slug: { equals: sampleCity.slug } },
  })
  if (page.docs[0]) {
    await payload.delete({
      collection: 'pages',
      id: page.docs[0].id,
      overrideAccess: true,
    })
  }
  const existing = await payload.find({
    collection: 'cities',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: { slug: { equals: sampleCity.slug } },
  })
  if (existing.docs[0]) return existing.docs[0]
  return payload.create({
    collection: 'cities',
    data: sampleCity,
    overrideAccess: true,
  })
}

export async function ensureSampleOffice(payload: Payload) {
  const existing = await payload.find({
    collection: 'property-types',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: { slug: { equals: sampleOffice.slug } },
  })
  if (existing.docs[0]) return existing.docs[0]
  return payload.create({
    collection: 'property-types',
    data: sampleOffice,
    overrideAccess: true,
  })
}

export async function ensurePlaceSamples(payload: Payload) {
  await ensureSampleCity(payload)
  await ensureSampleOffice(payload)
}

export async function ensurePublicPages(payload: Payload) {
  for (const page of publicPageSeeds) {
    const existing = await payload.find({
      collection: 'pages',
      depth: 0,
      limit: 1,
      overrideAccess: true,
      where: { slug: { equals: page.slug } },
    })
    if (existing.docs[0]) continue
    await payload.create({
      collection: 'pages',
      data: page,
      overrideAccess: true,
    })
  }
}

export async function ensureStorySamples(payload: Payload) {
  const draft = await payload.find({
    collection: 'posts',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: { slug: { equals: sampleDraftPost.slug } },
  })
  if (!draft.docs[0]) {
    await payload.create({
      collection: 'posts',
      data: sampleDraftPost,
      overrideAccess: true,
    })
  }

  const term = await payload.find({
    collection: 'glossary',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: { slug: { equals: sampleTerm.slug } },
  })
  if (!term.docs[0]) {
    await payload.create({
      collection: 'glossary',
      data: sampleTerm,
      overrideAccess: true,
    })
  }

  const users = await payload.find({
    collection: 'users',
    depth: 0,
    limit: 1,
    overrideAccess: true,
  })
  const author = users.docs[0]
  if (!author) return
  const post = await payload.find({
    collection: 'posts',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: { slug: { equals: samplePost.slug } },
  })
  if (post.docs[0]) return
  await payload.create({
    collection: 'posts',
    data: { ...samplePost, author: author.id },
    overrideAccess: true,
  })
}

export async function ensureStagingAccounts(payload: Payload) {
  for (const account of stagingAccounts) {
    const existing = await payload.find({
      collection: 'users',
      depth: 0,
      limit: 1,
      overrideAccess: true,
      where: { email: { equals: account.email } },
    })
    const current =
      existing.docs[0] ??
      (await payload.create({
        collection: 'users',
        data: {
          email: account.email,
          password: account.password,
          firstName: account.firstName,
          lastName: account.lastName,
          role: account.role,
        },
        overrideAccess: true,
      }))
    await payload.db.drizzle.execute(
      sql`update "users" set "admin_role" = ${account.adminRole} where "id" = ${current.id}`,
    )
  }
}

export async function ensureSampleRedirect(payload: Payload) {
  const existing = await payload.find({
    collection: 'redirects',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: { fromPath: { equals: sampleRedirect.fromPath } },
  })
  const current = existing.docs[0]
  if (current) {
    return payload.update({
      collection: 'redirects',
      id: current.id,
      data: sampleRedirect,
      overrideAccess: true,
    })
  }
  return payload.create({
    collection: 'redirects',
    data: sampleRedirect,
    overrideAccess: true,
  })
}
