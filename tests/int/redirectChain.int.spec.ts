import { describe, expect, it } from 'vitest'

import { resolveRedirect, skipRedirectLookup } from '@/lib/publicRedirect'

describe('redirect chains', () => {
  it('opens the newest address when a slug changes again', () => {
    expect(
      resolveRedirect('/about', [
        { fromPath: '/about', toPath: '/about-us', statusCode: 301 },
        { fromPath: '/about-us', toPath: '/our-story', statusCode: 301 },
      ]),
    ).toEqual({ toPath: '/our-story', statusCode: 301 })
  })

  it('stops when two redirects point at each other', () => {
    expect(
      resolveRedirect('/about', [
        { fromPath: '/about', toPath: '/about-us', statusCode: 301 },
        { fromPath: '/about-us', toPath: '/about', statusCode: 301 },
      ]),
    ).toBeNull()
  })

  it('leaves the admin and static files alone', () => {
    expect(skipRedirectLookup('/admin')).toBe(true)
    expect(skipRedirectLookup('/api/users')).toBe(true)
    expect(skipRedirectLookup('/_next/static/chunk.js')).toBe(true)
    expect(skipRedirectLookup('/health')).toBe(true)
    expect(skipRedirectLookup('/about')).toBe(false)
    expect(
      resolveRedirect('/admin', [{ fromPath: '/admin', toPath: '/about', statusCode: 301 }]),
    ).toBeNull()
  })
})
