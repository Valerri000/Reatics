import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { scrubEvent } from '@/lib/sentry'

describe('sentry', () => {
  it('drops request details before an error is sent', () => {
    const event = scrubEvent({
      request: {
        cookies: { payload: 'session' },
        headers: { authorization: 'secret' },
        data: 'password',
      },
    } as Parameters<typeof scrubEvent>[0])
    expect(event?.request?.cookies).toBeUndefined()
    expect(event?.request?.headers).toBeUndefined()
    expect(event?.request?.data).toBeUndefined()
    const page = readFileSync('src/app/(frontend)/error.tsx', 'utf8')
    expect(page.includes('error.message')).toBe(false)
  })
})
