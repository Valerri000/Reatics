import { describe, expect, it } from 'vitest'

import { Posts } from '@/collections/Posts'

function field(name: string) {
  const match = Posts.fields.find((item) => 'name' in item && item.name === name)
  if (!match) throw new Error(`missing ${name}`)
  return match
}

describe('post publish fields', () => {
  it('stores a publish date and an author', () => {
    expect(field('publishedOn')).toMatchObject({ type: 'date', label: 'Publish date' })
    expect(field('author')).toMatchObject({ type: 'relationship', relationTo: 'users' })
    expect(field('status')).toMatchObject({ defaultValue: 'draft' })
  })
})
