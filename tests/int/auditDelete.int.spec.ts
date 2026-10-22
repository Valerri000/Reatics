import { describe, expect, it } from 'vitest'

import { recordDelete } from '@/lib/audit'

describe('audit delete', () => {
  it('names the target when a record is deleted', async () => {
    const created: { data?: { action?: string; target?: string; actor?: number } }[] = []
    const req = {
      user: { id: 2 },
      payload: {
        create: async (args: (typeof created)[number]) => {
          created.push(args)
          return { id: 1 }
        },
      },
    }
    await recordDelete({
      collection: { slug: 'listings' },
      doc: { id: 8 },
      req,
    } as unknown as Parameters<typeof recordDelete>[0])
    expect(created).toHaveLength(1)
    expect(created[0]?.data).toMatchObject({ action: 'delete', target: 'listings/8', actor: 2 })
  })
})
