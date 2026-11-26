import { describe, expect, it } from 'vitest'

import { Billing } from '@/collections/Billing'
import { canIssueRefund } from '@/lib/refundAccess'

function allow(access: unknown, user: unknown) {
  if (typeof access !== 'function') throw new Error('missing access')
  return access({ req: { user } })
}

describe('refund access', () => {
  it('lets an owner record a refund and blocks a content manager and a moderator', () => {
    expect(canIssueRefund({ adminRole: 'owner' })).toBe(true)
    expect(canIssueRefund({ adminRole: 'content-manager' })).toBe(false)
    expect(canIssueRefund({ adminRole: 'moderator' })).toBe(false)
    expect(canIssueRefund(null)).toBe(false)
    expect(allow(Billing.access?.create, { adminRole: 'owner' })).toBe(true)
    expect(allow(Billing.access?.create, { adminRole: 'content-manager' })).toBe(false)
    expect(allow(Billing.access?.create, { adminRole: 'moderator' })).toBe(false)
  })
})
