import { getPayload } from 'payload'

import config from '@/payload.config'
import { sitemapCollections, sitemapPath, type SitemapCollection } from '@/lib/sitemapRecord'

export async function loadSitemapPaths() {
  const payload = await getPayload({ config })
  const paths: string[] = []
  for (const collection of sitemapCollections) {
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
  return [...new Set(paths)].sort()
}
