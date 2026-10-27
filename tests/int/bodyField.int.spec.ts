import { describe, expect, it } from 'vitest'

import { Cities } from '@/collections/Cities'
import { Glossary } from '@/collections/Glossary'
import { Pages } from '@/collections/Pages'
import { Posts } from '@/collections/Posts'
import { PropertyTypes } from '@/collections/PropertyTypes'
import { bodyHeadingSizes } from '@/fields/body'

function field(collection: { fields: { name?: string; type?: string }[] }, name: string) {
  const match = collection.fields.find((item) => item.name === name)
  if (!match) throw new Error(`missing ${name}`)
  return match
}

describe('formatted body', () => {
  it('stores a rich text body with H2 headings', () => {
    expect(bodyHeadingSizes).toContain('h2')
    expect(bodyHeadingSizes).not.toContain('h1')
    for (const collection of [Pages, Posts, Cities, PropertyTypes]) {
      expect(field(collection, 'content')).toMatchObject({ type: 'richText' })
    }
    expect(field(Glossary, 'definition')).toMatchObject({ type: 'richText', label: 'Definition' })
  })
})
