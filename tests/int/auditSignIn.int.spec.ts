import { describe, expect, it } from 'vitest'

import { recordSignIn } from '@/lib/audit'

describe('audit sign-in', () => {
  it('writes one audit row for a sign-in', async () => {
    const created: {
      collection?: string
      data?: { action?: string; target?: string; actor?: number }
    }[] = []
    const req = {
      user: { id: 4 },
      payload: {
        create: async (args: (typeof created)[number]) => {
          created.push(args)
          return { id: 1 }
        },
      },
    }
    await recordSignIn({ req, user: { id: 9 } } as Parameters<typeof recordSignIn>[0])
    expect(created).toHaveLength(1)
    expect(created[0]?.collection).toBe('audit-log')
    expect(created[0]?.data).toMatchObject({ action: 'sign-in', target: 'users/9', actor: 9 })
  })
})
