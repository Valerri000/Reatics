import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('refund record', () => {
  it('stores the refund action and the Stripe refund id', () => {
    const source = readFileSync('src/lib/recordRefund.ts', 'utf8')
    expect(source).toContain('insert into "billing"')
    expect(source).toContain("'refund'")
    expect(source).toContain('re_')
    expect(source.toLowerCase()).not.toContain('card')
    const action = readFileSync('src/lib/issueRefund.ts', 'utf8')
    expect(action).toContain('postRefund')
    expect(action).toContain('recordRefund')
    expect(action).toContain('canIssueRefund')
  })
})
