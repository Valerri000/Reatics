import type { Field } from 'payload'
import { describe, expect, it } from 'vitest'

import { Cities } from '@/collections/Cities'
import { Glossary } from '@/collections/Glossary'
import { Posts } from '@/collections/Posts'
import { PropertyTypes } from '@/collections/PropertyTypes'

function namedFields(fields: Field[]) {
  return fields.flatMap((field) => ('name' in field && field.name ? [field] : []))
}

function fieldByName(fields: Field[], name: string) {
  const field = namedFields(fields).find((item) => item.name === name)
  if (!field) throw new Error(`missing ${name}`)
  return field
}

describe('marketing slugs', () => {
  it('keeps each marketing slug unique', () => {
    for (const collection of [Posts, Glossary, Cities, PropertyTypes]) {
      expect(fieldByName(collection.fields, 'slug')).toMatchObject({
        type: 'text',
        required: true,
        unique: true,
        index: true,
      })
    }
  })
})
