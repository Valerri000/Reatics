import { describe, expect, it } from 'vitest'

import { Subscriptions } from '@/collections/Subscriptions'

describe('subscription access', () => {
  it('lets the owner read status and keeps card numbers off the record', () => {
    const names = Subscriptions.fields.map((field) => ('name' in field ? field.name : ''))
    expect(names).toEqual([
      'user',
      'planId',
      'status',
      'amountCents',
      'stripeCustomerId',
      'stripeSubscriptionId',
      'stripeCheckoutSessionId',
    ])
    expect(names.join(' ')).not.toMatch(/card|pan|cvc|cvv/i)
    const access = Subscriptions.access
    if (!access?.read || !access.create || !access.update) throw new Error('missing access')
    const read = access.read as (args: { req: { user: { adminRole: string | null } } }) => boolean
    expect(read({ req: { user: { adminRole: 'owner' } } })).toBe(true)
    expect(read({ req: { user: { adminRole: 'content-manager' } } })).toBe(false)
    expect(read({ req: { user: { adminRole: 'moderator' } } })).toBe(false)
    const create = access.create as () => boolean
    const update = access.update as () => boolean
    expect(create()).toBe(false)
    expect(update()).toBe(false)
  })
})
