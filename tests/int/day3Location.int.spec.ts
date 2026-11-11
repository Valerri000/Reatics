import { describe, expect, it } from 'vitest'

import { baselineHeaders } from '@/lib/securityHeaders'

describe('map location', () => {
  it('lets the site read the browser location', () => {
    const policy = baselineHeaders.find((header) => header.key === 'Permissions-Policy')?.value
    expect(policy).toContain('geolocation=(self)')
    expect(policy).toContain('camera=()')
    expect(policy).toContain('microphone=()')
  })
})
