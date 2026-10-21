import { describe, expect, it } from 'vitest'

import { baselineHeaders, securityHeaders } from '@/lib/securityHeaders'

describe('security headers', () => {
  it('hides the server banner and sends the baseline headers', () => {
    expect(baselineHeaders.map((header) => header.key)).toEqual([
      'X-Content-Type-Options',
      'Referrer-Policy',
      'X-DNS-Prefetch-Control',
      'Permissions-Policy',
    ])
    expect(baselineHeaders.find((header) => header.key === 'X-Content-Type-Options')?.value).toBe(
      'nosniff',
    )
  })

  it('refuses to frame the site and sends strict transport on production', () => {
    const names = securityHeaders(false).map((header) => header.key)
    expect(names).toContain('X-Frame-Options')
    expect(names).not.toContain('Strict-Transport-Security')
    expect(securityHeaders(true).find((header) => header.key === 'X-Frame-Options')?.value).toBe(
      'SAMEORIGIN',
    )
    expect(
      securityHeaders(true).find((header) => header.key === 'Strict-Transport-Security')?.value,
    ).toContain('max-age=63072000')
  })
})
