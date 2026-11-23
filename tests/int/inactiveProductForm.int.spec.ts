import { describe, expect, it } from 'vitest'

import { addons } from '@/lib/addons'
import { inactiveProductBody } from '@/lib/inactiveProductForm'

describe('inactive product form', () => {
  it('creates each add-on inactive and without a price', () => {
    for (const addon of addons) {
      const body = inactiveProductBody(addon).toString()
      expect(body).toContain('active=false')
      expect(body).toContain(`metadata%5Baddon%5D=${addon.id}`)
      expect(body).toContain('metadata%5Bpublic_purchase%5D=false')
      expect(body).not.toContain('unit_amount')
      expect(body).not.toContain('checkout')
    }
  })
})
