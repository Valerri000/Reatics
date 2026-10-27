import { ValidationError } from 'payload'
import { describe, expect, it } from 'vitest'

import { Cities } from '@/collections/Cities'
import { Glossary } from '@/collections/Glossary'
import { Pages } from '@/collections/Pages'
import { Posts } from '@/collections/Posts'
import { PropertyTypes } from '@/collections/PropertyTypes'
import {
  blockUnreadyPost,
  blockUnreadyPublish,
  publishErrors,
  publishMessage,
  stampPublishDate,
  statusField,
} from '@/lib/publish'

const ready = {
  title: 'About',
  h1: 'About Reatics',
  content: { root: { children: [{ type: 'text', text: 'A body.' }] } },
  status: 'published',
}

describe('publish rules', () => {
  it('lets a draft save without an H1 or a body', () => {
    expect(publishErrors({ title: 'About', status: 'draft' }, 'title', 'content')).toEqual([])
  })

  it('blocks publish until the title, H1, and body are present', () => {
    const errors = publishErrors({ title: 'About', status: 'published' }, 'title', 'content')
    expect(errors.map((error) => error.path)).toEqual(['h1', 'content'])
    expect(errors.every((error) => error.message === publishMessage)).toBe(true)
    expect(() => blockUnreadyPublish('title', 'content')({ data: { status: 'published' } } as never)).toThrow(
      ValidationError,
    )
  })

  it('accepts a complete published record', () => {
    expect(publishErrors(ready, 'title', 'content')).toEqual([])
    const hook = blockUnreadyPublish('term', 'definition')
    const data = {
      term: 'Cap rate',
      h1: 'Cap rate',
      definition: 'Income divided by price.',
      status: 'published',
    }
    expect(hook({ data } as never)).toBe(data)
  })

  it('defaults a new record to draft', () => {
    expect(statusField).toMatchObject({ name: 'status', defaultValue: 'draft', required: true })
    for (const collection of [Pages, Posts, Glossary, Cities, PropertyTypes]) {
      const status = collection.fields.find((field) => 'name' in field && field.name === 'status')
      expect(status).toMatchObject({ defaultValue: 'draft' })
    }
  })

  it('requires an author and keeps a publish date on a post', () => {
    expect(() =>
      blockUnreadyPost({ data: { ...ready, author: null } } as never),
    ).toThrow(ValidationError)
    const dated = stampPublishDate({ data: { ...ready, publishedOn: '2026-10-27T00:00:00.000Z' } })
    expect(dated.publishedOn).toBe('2026-10-27T00:00:00.000Z')
    const stamped = stampPublishDate({ data: { ...ready } })
    expect(typeof stamped.publishedOn).toBe('string')
    expect(stampPublishDate({ data: { status: 'draft' } }).publishedOn).toBeUndefined()
  })
})
