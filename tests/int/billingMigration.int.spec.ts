import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('billing status table', () => {
  it('stores the subscription status, the listing account, and the mailbox', () => {
    const migration = readFileSync('src/migrations/20261125_081500_billing_status.ts', 'utf8')
    const index = readFileSync('src/migrations/index.ts', 'utf8')
    expect(migration).toContain('"subscription_status"')
    expect(migration).toContain('"account_id"')
    expect(migration).toContain('CREATE TABLE IF NOT EXISTS "mailbox"')
    expect(migration).toContain('"mailbox_id"')
    expect(index).toContain('20261125_081500_billing_status')
  })
})
