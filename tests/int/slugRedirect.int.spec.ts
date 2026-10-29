import { describe, expect, it } from 'vitest'
import type { PayloadRequest } from 'payload'

import { redirectForSlugChange, storeSlugRedirect } from '@/lib/slugRedirect'

type Row = { id: number; fromPath: string; toPath: string; statusCode: number }

function memory() {
  const rows: Row[] = []
  const payload = {
    async find({
      where,
    }: {
      where: { fromPath?: { equals: string }; toPath?: { equals: string } }
    }) {
      const fromPath = where.fromPath?.equals
      const toPath = where.toPath?.equals
      return {
        docs: rows.filter((row) => {
          if (fromPath) return row.fromPath === fromPath
          if (toPath) return row.toPath === toPath
          return false
        }),
      }
    },
    async create({ data }: { data: Omit<Row, 'id'> }) {
      const row = { id: rows.length + 1, ...data }
      rows.push(row)
      return row
    },
    async update({ id, data }: { id: number; data: Partial<Row> }) {
      const row = rows.find((item) => item.id === id)
      if (!row) throw new Error('missing redirect')
      Object.assign(row, data)
      return row
    },
    async delete({ id }: { id: number }) {
      const index = rows.findIndex((item) => item.id === id)
      if (index >= 0) rows.splice(index, 1)
    },
  }
  return {
    rows,
    req: { payload } as unknown as PayloadRequest,
  }
}

describe('slug redirects', () => {
  it('builds a 301 only when the slug changes', () => {
    expect(redirectForSlugChange('pages', 'about', 'about')).toBeNull()
    expect(redirectForSlugChange('pages', '', 'about')).toBeNull()
    expect(redirectForSlugChange('pages', 'about', 'about-us')).toEqual({
      fromPath: '/about',
      toPath: '/about-us',
      statusCode: 301,
    })
    expect(redirectForSlugChange('listings', 'brand', 'brand-blvd')).toEqual({
      fromPath: '/listings/brand',
      toPath: '/listings/brand-blvd',
      statusCode: 301,
    })
    expect(redirectForSlugChange('posts', 'market-notes', 'how-to-read-a-listing')).toEqual({
      fromPath: '/blog/market-notes',
      toPath: '/blog/how-to-read-a-listing',
      statusCode: 301,
    })
    expect(redirectForSlugChange('glossary', 'cap', 'cap-rate')).toEqual({
      fromPath: '/glossary/cap',
      toPath: '/glossary/cap-rate',
      statusCode: 301,
    })
  })

  it('writes one redirect when a page slug changes', async () => {
    const store = memory()
    await storeSlugRedirect({
      collection: 'pages',
      operation: 'create',
      doc: { slug: 'about' },
      req: store.req,
    })
    expect(store.rows).toEqual([])

    await storeSlugRedirect({
      collection: 'pages',
      operation: 'update',
      previousDoc: { slug: 'about' },
      doc: { slug: 'about-us' },
      req: store.req,
    })
    expect(store.rows).toEqual([
      { id: 1, fromPath: '/about', toPath: '/about-us', statusCode: 301 },
    ])

    await storeSlugRedirect({
      collection: 'pages',
      operation: 'update',
      previousDoc: { slug: 'about-us' },
      doc: { slug: 'our-story' },
      req: store.req,
    })
    expect(store.rows).toEqual([
      { id: 1, fromPath: '/about', toPath: '/our-story', statusCode: 301 },
      { id: 2, fromPath: '/about-us', toPath: '/our-story', statusCode: 301 },
    ])
  })

  it('removes the reverse redirect when a slug moves back', async () => {
    const store = memory()
    store.rows.push({ id: 1, fromPath: '/about', toPath: '/about-us', statusCode: 301 })
    await storeSlugRedirect({
      collection: 'pages',
      operation: 'update',
      previousDoc: { slug: 'about-us' },
      doc: { slug: 'about' },
      req: store.req,
    })
    expect(store.rows).toEqual([
      { id: 2, fromPath: '/about-us', toPath: '/about', statusCode: 301 },
    ])
  })

  it('stores a 301 when a post or a term slug changes', async () => {
    const store = memory()
    await storeSlugRedirect({
      collection: 'posts',
      operation: 'update',
      previousDoc: { slug: 'market-notes' },
      doc: { slug: 'how-to-read-a-listing' },
      req: store.req,
    })
    await storeSlugRedirect({
      collection: 'glossary',
      operation: 'update',
      previousDoc: { slug: 'cap' },
      doc: { slug: 'cap-rate' },
      req: store.req,
    })
    expect(store.rows).toEqual([
      {
        id: 1,
        fromPath: '/blog/market-notes',
        toPath: '/blog/how-to-read-a-listing',
        statusCode: 301,
      },
      { id: 2, fromPath: '/glossary/cap', toPath: '/glossary/cap-rate', statusCode: 301 },
    ])
  })
})
