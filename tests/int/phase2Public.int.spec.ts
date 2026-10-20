import { existsSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { Companies } from '@/collections/Companies'
import { CompanyMembers } from '@/collections/CompanyMembers'
import { DealParticipants } from '@/collections/DealParticipants'
import { Deals } from '@/collections/Deals'
import { LeaseDrafts } from '@/collections/LeaseDrafts'
import { ScreeningRequests } from '@/collections/ScreeningRequests'
import { SignedDocuments } from '@/collections/SignedDocuments'
import type { CollectionConfig } from 'payload'

const tables = [
  Companies,
  CompanyMembers,
  Deals,
  DealParticipants,
  ScreeningRequests,
  LeaseDrafts,
  SignedDocuments,
]

async function allow(collection: CollectionConfig, key: 'read' | 'create', user: null) {
  const access = collection.access
  if (!access) throw new Error('missing access')
  const rule = access[key]
  if (typeof rule !== 'function') throw new Error(key)
  return rule({ req: { user } } as Parameters<typeof rule>[0])
}

describe('phase 2 public site', () => {
  it('keeps the empty Phase 2 tables off the public site', async () => {
    for (const collection of tables) {
      expect(await allow(collection, 'read', null)).toBe(false)
      expect(await allow(collection, 'create', null)).toBe(false)
    }
    expect(existsSync('src/app/(frontend)/deals')).toBe(false)
    expect(existsSync('src/app/(frontend)/deals/page.tsx')).toBe(false)
    expect(existsSync('src/app/(frontend)/companies')).toBe(false)
    expect(existsSync('src/app/(frontend)/companies/page.tsx')).toBe(false)
  })
})
