import { describe, expect, it } from 'vitest'

import { requestPath } from '@/lib/publicRedirect'

describe('redirect paths', () => {
  it('reads the path without a trailing slash or a query', () => {
    expect(requestPath('/about/')).toBe('/about')
    expect(requestPath('/blog/market-notes?preview=1')).toBe('/blog/market-notes')
    expect(requestPath('glendale')).toBe('/glendale')
    expect(requestPath('/')).toBeNull()
    expect(requestPath('')).toBeNull()
  })
})
