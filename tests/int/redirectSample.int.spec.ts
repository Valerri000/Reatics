import { describe, expect, it } from 'vitest'

import { resolveRedirect } from '@/lib/publicRedirect'
import { sampleRedirect } from '@/lib/samples'

describe('sample redirect', () => {
  it('answers the staged listing redirect', () => {
    expect(
      resolveRedirect(sampleRedirect.fromPath, [
        {
          fromPath: sampleRedirect.fromPath,
          toPath: sampleRedirect.toPath,
          statusCode: sampleRedirect.statusCode,
        },
      ]),
    ).toEqual({
      toPath: '/listings/201-n-brand',
      statusCode: 301,
    })
  })
})
