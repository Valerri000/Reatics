import type { Field } from 'payload'
import { describe, expect, it } from 'vitest'

import { Cities } from '@/collections/Cities'
import { Glossary } from '@/collections/Glossary'
import { Posts } from '@/collections/Posts'
import { PropertyTypes } from '@/collections/PropertyTypes'
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

const collections = [Posts, Glossary, Cities, PropertyTypes]

describe('marketing SEO', () => {
  it('stores the SEO block on every marketing collection', () => {
    for (const collection of collections) {
      const names = fieldNames(collection.fields)
      for (const name of seoFields) {
        expect(names).toContain(name)
      }
      expect(fieldByName(collection.fields, 'socialDescription')).toMatchObject({
        type: 'textarea',
      })
      expect(fieldByName(collection.fields, 'robots')).toMatchObject({
        type: 'select',
        defaultValue: 'index',
      })
      expect(fieldByName(collection.fields, 'sitemap')).toMatchObject({
        type: 'checkbox',
        defaultValue: true,
      })
    }
  })
})
