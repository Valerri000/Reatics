import { getPayload } from 'payload'

import config from '@/payload.config'
import { publicSitemapPaths, sitemapCollections, sitemapPath, type SitemapCollection } from '@/lib/sitemapRecord'

export async function loadSitemapPaths() {
  const payload = await getPayload({ config })
  const paths: string[] = []
  for (const collection of sitemapCollections) {
    if (collection === 'listings') {
      const found = await payload.find({
        collection: 'listings',
        depth: 0,
        limit: 1000,
        overrideAccess: true,
        where: {
          and: [{ robots: { equals: 'index' } }, { sitemap: { equals: true } }],
        },
      })
      for (const doc of found.docs) {
        const path = sitemapPath({
          collection: 'listings',
          slug: doc.slug,
          robots: doc.robots,
          sitemap: doc.sitemap,
          availability: doc.availability,
        })
        if (path) paths.push(path)
      }
      continue
    }
    const found = await payload.find({
      collection,
      depth: 0,
      limit: 1000,
      overrideAccess: true,
      where: {
        and: [
          { status: { equals: 'published' } },
          { robots: { equals: 'index' } },
          { sitemap: { equals: true } },
        ],
      },
    })
    for (const doc of found.docs) {
      const path = sitemapPath({
        collection: collection as SitemapCollection,
        slug: doc.slug,
        status: doc.status,
        robots: doc.robots,
        sitemap: doc.sitemap,
      })
      if (path) paths.push(path)
    }
  }
  return publicSitemapPaths(paths)
}
