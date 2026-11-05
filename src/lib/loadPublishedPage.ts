import { cache } from 'react'
import { getPayload } from 'payload'

import config from '@/payload.config'
import type { Page } from '@/payload-types'

export const loadPublishedPage = cache(async (slug: string): Promise<Page | null> => {
  const page = await loadPageBySlug(slug)
  if (!page || page.status !== 'published') return null
  return page
})

export const loadPageBySlug = cache(async (slug: string): Promise<Page | null> => {
  const payload = await getPayload({ config })
  const found = await payload.find({
    collection: 'pages',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: { slug: { equals: slug } },
  })
  return found.docs[0] ?? null
})
