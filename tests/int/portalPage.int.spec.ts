import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('portal page', () => {
  it('reads the portal result and does not start checkout', () => {
    const page = readFileSync('src/app/(frontend)/billing/portal/page.tsx', 'utf8')
    expect(page).toContain('PortalReturn')
    expect(page).toContain("result === 'error'")
    expect(page).not.toContain('checkout/sessions')
    expect(page).not.toContain('startPlanCheckout')
  })
})
