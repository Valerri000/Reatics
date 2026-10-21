import { describe, expect, it } from 'vitest'

import { AuditLog, auditActions } from '@/collections/AuditLog'

type RuleUser = { adminRole?: 'owner' | 'content-manager' | 'moderator' } | null

async function allow(key: 'read' | 'create' | 'update' | 'delete', user: RuleUser) {
  const access = AuditLog.access
  if (!access) throw new Error('missing access')
  const rule = access[key]
  if (typeof rule !== 'function') throw new Error(key)
  return rule({ req: { user } } as Parameters<typeof rule>[0])
}

describe('audit log access', () => {
  it('lets only the owner read the log', async () => {
    expect(await allow('read', null)).toBe(false)
    expect(await allow('read', { adminRole: 'moderator' })).toBe(false)
    expect(await allow('read', { adminRole: 'content-manager' })).toBe(false)
    expect(await allow('read', { adminRole: 'owner' })).toBe(true)
    expect(await allow('create', { adminRole: 'owner' })).toBe(false)
    expect(await allow('update', { adminRole: 'owner' })).toBe(false)
    expect(await allow('delete', { adminRole: 'owner' })).toBe(false)
    expect([...auditActions]).toEqual(['sign-in', 'role-change', 'delete'])
  })
})
