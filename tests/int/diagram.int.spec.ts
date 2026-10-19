import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { Billing } from '@/collections/Billing'
import { Listings } from '@/collections/Listings'
import { Media } from '@/collections/Media'
import { Pages } from '@/collections/Pages'
import { Redirects } from '@/collections/Redirects'
import { Users } from '@/collections/Users'
import {
  adminRoles,
  entities,
  heldBack,
  inquiryExcluded,
  inquiryFields,
  productRoles,
  redirectFields,
  redirectStatusCode,
  relationships,
  seoFields,
} from '@/lib/diagram'

const present = [Users, Pages, Listings, Media, Billing, Redirects]

function options(name: string) {
  const field = Users.fields.find((item) => 'name' in item && item.name === name)
  if (!field || !('options' in field) || !Array.isArray(field.options)) {
    throw new Error(`missing ${name}`)
  }
  return field.options.map((option) => (typeof option === 'string' ? option : option.value))
}

describe('entity diagram', () => {
  it('matches the collections that already exist', () => {
    const names = present.map((collection) => collection.slug)
    const drawn = entities
      .filter((entity) => entity.status === 'present' && entity.storage === 'table')
      .map((entity) => entity.name)
    expect([...drawn].sort()).toEqual([...names].sort())
    expect(entities.find((entity) => entity.name === 'seo')).toMatchObject({
      storage: 'fields',
      status: 'present',
    })
    expect(entities.find((entity) => entity.name === 'inquiries')?.status).toBe('planned')
    expect(names).not.toContain('inquiries')
    expect(names).not.toContain('seo')
  })

  it('uses the role values already stored on users', () => {
    expect(options('role')).toEqual(productRoles.map((role) => role.value))
    expect(options('adminRole')).toEqual(adminRoles.map((role) => role.value))
    expect(adminRoles.every((role) => role.field === 'adminRole')).toBe(true)
  })

  it('keeps SEO, redirects, and inquiries on the reviewed names', () => {
    const seo = entities.find((entity) => entity.name === 'seo')
    expect(seo).toMatchObject({ storage: 'fields', on: ['pages', 'listings'] })
    expect([...seoFields]).toEqual([
      'slug',
      'pageTitle',
      'metaDescription',
      'robots',
      'canonicalUrl',
      'h1',
      'imageAlt',
      'socialTitle',
      'sitemap',
    ])
    expect([...redirectFields]).toEqual(['fromPath', 'toPath', 'statusCode'])
    expect(redirectStatusCode).toBe(301)
    expect([...inquiryFields]).toEqual(['name', 'email', 'message', 'listing'])
    expect(
      inquiryFields.some((field) => (inquiryExcluded as readonly string[]).includes(field)),
    ).toBe(false)
  })

  it('does not draw the later tables', () => {
    const drawn = entities.map((entity) => entity.name)
    for (const name of heldBack) {
      expect(drawn).not.toContain(name)
    }
  })

  it('matches the committed diagram', () => {
    const diagram = readFileSync('docs/entity-diagram.md', 'utf8')
    for (const entity of entities) {
      expect(diagram).toContain(entity.name)
    }
    for (const link of relationships) {
      expect(diagram).toContain(link.label)
    }
    for (const name of heldBack) {
      expect(diagram).toContain(name)
    }
    for (const field of seoFields) {
      expect(diagram).toContain(field)
    }
  })
})
