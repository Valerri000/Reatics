export type SecurityHeader = { key: string; value: string }

export const baselineHeaders: SecurityHeader[] = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'off' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

export const frameHeader: SecurityHeader = { key: 'X-Frame-Options', value: 'SAMEORIGIN' }

export const strictTransportHeader: SecurityHeader = {
  key: 'Strict-Transport-Security',
  value: 'max-age=63072000; includeSubDomains',
}

export function securityHeaders(production: boolean): SecurityHeader[] {
  const headers = [...baselineHeaders, frameHeader]
  if (production) headers.push(strictTransportHeader)
  return headers
}
