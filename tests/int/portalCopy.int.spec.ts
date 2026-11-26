import { describe, expect, it } from 'vitest'

import { portalCopy } from '@/lib/portalCopy'

describe('portal copy', () => {
  it('names the return, the empty receipt list, and the error', () => {
    expect(portalCopy.return).toBe('You are back from the customer portal.')
    expect(portalCopy.purpose).toContain('cancel')
    expect(portalCopy.purpose).toContain('receipt')
    expect(portalCopy.emptyReceipts).toBe('No receipts yet.')
    expect(portalCopy.receiptError).toBe('The receipt list did not load.')
    expect(portalCopy.error).toBe('The customer portal did not open.')
  })
})
