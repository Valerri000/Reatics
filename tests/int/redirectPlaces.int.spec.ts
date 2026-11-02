import { describe, expect, it } from 'vitest'

import { resolveRedirect } from '@/lib/publicRedirect'

describe('city redirects', () => {
  it('sends an old city address to the new one', () => {
    expect(
      resolveRedirect('/glendale', [
        { fromPath: '/glendale', toPath: '/glendale-ca', statusCode: 301 },
      ]),
    ).toEqual({ toPath: '/glendale-ca', statusCode: 301 })
  })

  it('sends an old listing address to the new one', () => {
    expect(
      resolveRedirect('/listings/brand-glendale', [
        {
          fromPath: '/listings/brand-glendale',
          toPath: '/listings/201-n-brand',
          statusCode: 301,
        },
      ]),
    ).toEqual({ toPath: '/listings/201-n-brand', statusCode: 301 })
  })
})
