import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { graceNotice } from '@/lib/graceNotice'

describe('grace notice', () => {
  it('stores a past due notice and does not send it', () => {
    const notice = graceNotice('past_due')
    expect(notice).toMatchObject({ kind: 'grace', status: 'stored', sent: false })
    expect(notice?.body).toContain('not sent')
    expect(graceNotice('canceled')).toBeNull()
    expect(graceNotice('active')).toBeNull()
    const save = readFileSync('src/lib/saveSubscription.ts', 'utf8')
    expect(save).not.toContain('fetch(')
    expect(save.toLowerCase()).not.toContain('resend')
    expect(save.toLowerCase()).not.toContain('postmark')
  })
})
