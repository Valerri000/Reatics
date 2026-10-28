import type { Field, TextFieldSingleValidation } from 'payload'

export const slugCollections = [
  { slug: 'pages', label: 'page' },
  { slug: 'posts', label: 'post' },
  { slug: 'glossary', label: 'glossary term' },
  { slug: 'cities', label: 'city' },
  { slug: 'property-types', label: 'property type' },
] as const

export type SlugCollection = (typeof slugCollections)[number]['slug']

type SlugRow = {
  collection: string
  id?: string | number | null
  slug: string
}

type Finder = {
  payload: {
    find: (args: {
      collection: string
      where: { slug: { equals: string } }
      limit: number
      depth: number
      overrideAccess: boolean
      req: Finder
    }) => Promise<{ docs: { id?: string | number | null; slug?: string | null }[] }>
  }
}

export function sharedSlugMessage(slug: string, current: SlugRow, taken: SlugRow[]) {
  const clean = slug.trim()
  if (!clean) return true
  const hit = taken.find((row) => row.slug === clean && !sameRecord(row, current))
  if (!hit) return true
  const label = slugCollections.find((item) => item.slug === hit.collection)?.label || 'record'
  return `This URL is already used by a ${label}.`
}

export async function sharedSlugWarning({
  slug,
  collection,
  id,
  req,
}: {
  slug: unknown
  collection: SlugCollection
  id?: string | number | null
  req: Finder
}) {
  if (typeof slug !== 'string') return true
  const clean = slug.trim()
  if (!clean) return true
  const taken: SlugRow[] = []
  for (const item of slugCollections) {
    const found = await req.payload.find({
      collection: item.slug,
      where: { slug: { equals: clean } },
      limit: 10,
      depth: 0,
      overrideAccess: true,
      req,
    })
    for (const doc of found.docs) {
      if (typeof doc.slug === 'string') {
        taken.push({ collection: item.slug, id: doc.id, slug: doc.slug })
      }
    }
  }
  return sharedSlugMessage(clean, { collection, id, slug: clean }, taken)
}

export function publicSlugField(collection: SlugCollection): Field {
  const validate: TextFieldSingleValidation = (value, { req, id }) =>
    sharedSlugWarning({
      slug: value,
      collection,
      id,
      req: req as unknown as Finder,
    })
  return {
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,
    index: true,
    validate,
  }
}

function sameRecord(row: SlugRow, current: SlugRow) {
  if (row.collection !== current.collection) return false
  if (current.id === undefined || current.id === null) return false
  return String(row.id) === String(current.id)
}
