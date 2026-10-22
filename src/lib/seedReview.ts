import { sql } from '@payloadcms/db-postgres'
import type { Payload } from 'payload'

import { sampleCity, sampleListing } from '@/lib/samples'
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
  const existing = await payload.find({
    collection: 'pages',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: { slug: { equals: sampleCity.slug } },
  })
  const current = existing.docs[0]
  if (current) {
    return payload.update({
      collection: 'pages',
      id: current.id,
      data: sampleCity,
      overrideAccess: true,
    })
  }
  return payload.create({
    collection: 'pages',
    data: sampleCity,
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
