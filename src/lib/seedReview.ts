import type { Payload } from 'payload'

import { sampleCity, sampleListing } from '@/lib/samples'

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
