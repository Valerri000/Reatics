import type { Field } from 'payload'
import { describe, expect, it } from 'vitest'

import { Listings } from '@/collections/Listings'
import { Pages } from '@/collections/Pages'
import { Redirects } from '@/collections/Redirects'
import { seoFields } from '@/lib/diagram'

function namedFields(fields: Field[]) {
  return fields.flatMap((field) => ('name' in field && field.name ? [field] : []))
}

function fieldNames(fields: Field[]) {
  return namedFields(fields).map((field) => field.name)
}

function fieldByName(fields: Field[], name: string) {
  const field = namedFields(fields).find((item) => item.name === name)
  if (!field) throw new Error(`missing ${name}`)
  return field
}

describe('SEO fields', () => {
  it('stores the reviewed SEO names on pages and listings', () => {
    const pages = fieldNames(Pages.fields)
    const listings = fieldNames(Listings.fields)
    for (const name of seoFields) {
      expect(pages).toContain(name)
      expect(listings).toContain(name)
    }
  })

  it('stores index or noindex and a sitemap flag', () => {
    for (const fields of [Pages.fields, Listings.fields]) {
      const robots = fieldByName(fields, 'robots')
      expect(robots).toMatchObject({
        type: 'select',
        defaultValue: 'index',
        options: [
          { label: 'Index', value: 'index' },
          { label: 'Noindex', value: 'noindex' },
        ],
      })
      expect(fieldByName(fields, 'sitemap')).toMatchObject({
        type: 'checkbox',
        defaultValue: true,
      })
      expect(fieldByName(fields, 'socialDescription')).toMatchObject({
        type: 'textarea',
      })
    }
  })

  it('stores a 301 on the redirects table', () => {
    expect(fieldNames(Redirects.fields)).toEqual(['fromPath', 'toPath', 'statusCode'])
    expect(fieldByName(Redirects.fields, 'statusCode')).toMatchObject({
      type: 'number',
      required: true,
      defaultValue: 301,
    })
    expect(fieldByName(Redirects.fields, 'fromPath')).toMatchObject({
      required: true,
      unique: true,
    })
  })
})
