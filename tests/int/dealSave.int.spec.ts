import { describe, expect, it } from 'vitest'

import { Companies } from '@/collections/Companies'
import { CompanyMembers } from '@/collections/CompanyMembers'
import { DealParticipants } from '@/collections/DealParticipants'
import { Deals } from '@/collections/Deals'
import { LeaseDrafts } from '@/collections/LeaseDrafts'
import { ScreeningRequests } from '@/collections/ScreeningRequests'
import { SignedDocuments } from '@/collections/SignedDocuments'
import type { CollectionConfig, Field } from 'payload'

type RuleUser = { adminRole?: 'owner' | 'content-manager' | 'moderator' } | null

const tables = [
  Companies,
  CompanyMembers,
  Deals,
  DealParticipants,
  ScreeningRequests,
  LeaseDrafts,
  SignedDocuments,
]

async function allow(
  collection: CollectionConfig,
  key: 'read' | 'create' | 'update' | 'delete',
  user: RuleUser,
) {
  const access = collection.access
  if (!access) throw new Error('missing access')
  const rule = access[key]
  if (typeof rule !== 'function') throw new Error(key)
  return rule({ req: { user } } as Parameters<typeof rule>[0])
}

function fieldNames(fields: Field[]): string[] {
  return fields.flatMap((field) => {
    const names = 'name' in field && field.name ? [field.name] : []
    if ('fields' in field && Array.isArray(field.fields)) {
      return [...names, ...fieldNames(field.fields)]
    }
    return names
  })
}

describe('deals', () => {
  it('lets staff save a deal and leaves landlord and applicant off the table', async () => {
    expect(await allow(Deals, 'read', null)).toBe(false)
    expect(await allow(Deals, 'create', null)).toBe(false)
    expect(await allow(Deals, 'read', { adminRole: 'owner' })).toBe(true)
    expect(await allow(Deals, 'create', { adminRole: 'moderator' })).toBe(true)
    expect(await allow(Deals, 'create', { adminRole: 'content-manager' })).toBe(true)
    expect(await allow(Deals, 'update', { adminRole: 'owner' })).toBe(true)
    expect(await allow(Deals, 'delete', { adminRole: 'moderator' })).toBe(true)
    const title = Deals.fields.find((field) => 'name' in field && field.name === 'title')
    expect(title).toMatchObject({ type: 'text', required: true })
    for (const collection of tables) {
      const names = fieldNames(collection.fields)
      expect(names).not.toContain('landlord')
      expect(names).not.toContain('applicant')
    }
  })
})
