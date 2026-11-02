import { describe, expect, it } from 'vitest'

import { resolveRedirect } from '@/lib/publicRedirect'

describe('hand-added redirects', () => {
  it('answers a redirect saved by hand the same way', () => {
    expect(
      resolveRedirect('/old-services', [
        { fromPath: '/old-services', toPath: '/services', statusCode: 301 },
      ]),
    ).toEqual({ toPath: '/services', statusCode: 301 })
  })

  it('keeps a temporary redirect when that code was saved', () => {
    expect(
      resolveRedirect('/old-contact', [
        { fromPath: '/old-contact', toPath: '/contact', statusCode: 302 },
      ]),
    ).toEqual({ toPath: '/contact', statusCode: 302 })
  })
})
