import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { Cities } from '@/collections/Cities'
import { Glossary } from '@/collections/Glossary'
import { Posts } from '@/collections/Posts'
import { PropertyTypes } from '@/collections/PropertyTypes'
import { marketingCollections } from '@/lib/marketing'

describe('marketing collections', () => {
  it('names the four collections registered for staging', () => {
    expect(marketingCollections.map((collection) => collection.slug)).toEqual([
      Posts.slug,
      Glossary.slug,
      Cities.slug,
      PropertyTypes.slug,
    ])
    expect(marketingCollections.map((collection) => collection.label)).toEqual([
      'Blog',
      'Glossary',
      'Cities',
      'Property types',
    ])
  })

  it('registers those collections in the Payload config', () => {
    const source = readFileSync('src/payload.config.ts', 'utf8')
    for (const name of ['Posts', 'Glossary', 'Cities', 'PropertyTypes']) {
      expect(source).toContain(name)
    }
  })
})
