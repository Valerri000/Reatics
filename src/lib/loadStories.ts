import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'

import { canPreviewDraft, recordWhere } from '@/lib/preview'
import config from '@/payload.config'

export async function loadPublishedPosts() {
  const payload = await getPayload({ config })
  const found = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 100,
    overrideAccess: true,
    sort: '-publishedOn',
    where: { status: { equals: 'published' } },
  })
  return found.docs
}

export async function loadPost(slug: string, preview: boolean) {
  const payload = await getPayload({ config })
  let allowDraft = false
  if (preview) {
    const { user } = await payload.auth({ headers: await getHeaders() })
    allowDraft = canPreviewDraft(user, true)
  }
  const found = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 1,
    overrideAccess: true,
    where: recordWhere(slug, allowDraft),
  })
  return found.docs[0] ?? null
}

export async function loadPublishedTerms() {
  const payload = await getPayload({ config })
  const found = await payload.find({
    collection: 'glossary',
    depth: 0,
    limit: 200,
    overrideAccess: true,
    sort: 'term',
    where: { status: { equals: 'published' } },
  })
  return found.docs
}

export async function loadTerm(slug: string) {
  const payload = await getPayload({ config })
  const found = await payload.find({
    collection: 'glossary',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: recordWhere(slug, false),
  })
  return found.docs[0] ?? null
}
