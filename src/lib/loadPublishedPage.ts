import { cache } from 'react'
import { getPayload } from 'payload'

import config from '@/payload.config'
import type { Page } from '@/payload-types'

export const loadPublishedPage = cache(async (slug: string): Promise<Page | null> => {
  const payload = await getPayload({ config })
  const found = await payload.find({
    collection: 'pages',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: {
      and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }],
    },
  })
  return found.docs[0] ?? null
})
