import { describe, expect, it } from 'vitest'

import { recordRoleChange, roleChanged } from '@/lib/audit'

describe('audit role change', () => {
  it('names the actor when a role changes', async () => {
    expect(
      roleChanged({ role: 'space-seeker', adminRole: null }, { role: 'broker', adminRole: null }),
    ).toBe(true)
    expect(
      roleChanged({ role: 'broker', adminRole: null }, { role: 'broker', adminRole: null }),
    ).toBe(false)
    const created: { data?: { action?: string; target?: string; actor?: number } }[] = []
    const req = {
      user: { id: 3 },
      payload: {
        create: async (args: (typeof created)[number]) => {
          created.push(args)
          return { id: 1 }
        },
      },
    }
    const doc = { id: 12, role: 'broker', adminRole: 'moderator' }
    await recordRoleChange({
      doc,
      operation: 'update',
      previousDoc: { id: 12, role: 'space-seeker', adminRole: null },
      req,
    } as Parameters<typeof recordRoleChange>[0])
    expect(created).toHaveLength(1)
    expect(created[0]?.data).toMatchObject({
      action: 'role-change',
      target: 'users/12',
      actor: 3,
    })
  })
})
