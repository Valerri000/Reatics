import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { graceNotice } from '@/lib/graceNotice'
import { statusFromSubscription } from '@/lib/accountBilling'

describe('account status save', () => {
  it('copies a Stripe status onto the account and stores a grace notice', () => {
    const source = readFileSync('src/lib/saveSubscription.ts', 'utf8')
    expect(statusFromSubscription('past_due')).toBe('past_due')
    expect(source).toContain('"subscription_status"')
    expect(source).toContain('insert into "mailbox"')
    expect(source).toContain('graceNotice')
    expect(graceNotice('past_due')?.sent).toBe(false)
    expect(source.toLowerCase()).not.toContain('card')
    expect(source).not.toContain('fetch(')
  })
})
