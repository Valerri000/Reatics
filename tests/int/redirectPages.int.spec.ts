import { describe, expect, it } from 'vitest'

import { resolveRedirect } from '@/lib/publicRedirect'

describe('page and property-type redirects', () => {
  it('sends an old page address to the new one', () => {
    expect(
      resolveRedirect('/about', [
        { fromPath: '/about', toPath: '/about-us', statusCode: 301 },
      ]),
    ).toEqual({ toPath: '/about-us', statusCode: 301 })
  })

  it('sends an old property-type address to the new one', () => {
    expect(
      resolveRedirect('/office', [
        { fromPath: '/office', toPath: '/offices', statusCode: 301 },
      ]),
    ).toEqual({ toPath: '/offices', statusCode: 301 })
  })
})
