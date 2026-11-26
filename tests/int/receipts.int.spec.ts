import { describe, expect, it } from 'vitest'

import { publicReceipts, receiptState } from '@/lib/receipts'

describe('receipts', () => {
  it('keeps an invoice id and treats a missing list as empty', () => {
    expect(publicReceipts([{ id: 'in_test123', amountCents: 12900 }])).toEqual([{ id: 'in_test123', amountCents: 12900 }])
    expect(publicReceipts([{ id: '4242424242424242', amountCents: 12900 }])).toEqual([])
    expect(receiptState({ receipts: [] })).toBe('empty')
    expect(receiptState({ error: true, receipts: [{ id: 'in_test123', amountCents: 12900 }] })).toBe('error')
  })
})
