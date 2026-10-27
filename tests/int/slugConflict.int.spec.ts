import { describe, expect, it } from 'vitest'

import { Pages } from '@/collections/Pages'
import { Posts } from '@/collections/Posts'
import { sharedSlugMessage, sharedSlugWarning, slugCollections } from '@/lib/slugConflict'

const rows = [
  { collection: 'pages', id: 4, slug: 'about' },
  { collection: 'cities', id: 8, slug: 'glendale' },
  { collection: 'glossary', id: 2, slug: 'cap-rate' },
]

function finder(store: typeof rows) {
  return {
    payload: {
      find: async ({ collection, where }: { collection: string; where: { slug: { equals: string } } }) => ({
        docs: store
          .filter((row) => row.collection === collection && row.slug === where.slug.equals)
          .map((row) => ({ id: row.id, slug: row.slug })),
      }),
    },
  }
}

describe('shared slugs', () => {
  it('warns when a page already uses the slug', () => {
    expect(sharedSlugMessage('about', { collection: 'posts', slug: 'about' }, rows)).toBe(
      'This URL is already used by a page.',
    )
    expect(sharedSlugMessage('glendale', { collection: 'property-types', slug: 'glendale' }, rows)).toBe(
      'This URL is already used by a city.',
    )
    expect(sharedSlugMessage('cap-rate', { collection: 'posts', slug: 'cap-rate' }, rows)).toBe(
      'This URL is already used by a glossary term.',
    )
  })

  it('allows the same record to keep its slug', () => {
    expect(sharedSlugMessage('about', { collection: 'pages', id: 4, slug: 'about' }, rows)).toBe(true)
    expect(sharedSlugMessage('  ', { collection: 'pages', slug: '' }, rows)).toBe(true)
  })

  it('checks pages, posts, terms, cities, and property types', async () => {
    expect(slugCollections.map((item) => item.slug)).toEqual([
      'pages',
      'posts',
      'glossary',
      'cities',
      'property-types',
    ])
    const warning = await sharedSlugWarning({
      slug: 'about',
      collection: 'posts',
      req: finder(rows),
    })
    expect(warning).toBe('This URL is already used by a page.')
    const clear = await sharedSlugWarning({
      slug: 'services',
      collection: 'pages',
      req: finder(rows),
    })
    expect(clear).toBe(true)
    const pageSlug = Pages.fields.find((field) => 'name' in field && field.name === 'slug')
    const postSlug = Posts.fields.find((field) => 'name' in field && field.name === 'slug')
    expect(pageSlug).toMatchObject({ unique: true })
    expect(postSlug && 'validate' in postSlug).toBe(true)
  })
})
