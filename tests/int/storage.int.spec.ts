import { describe, expect, it } from 'vitest'

import { objectStorageEnabled } from '@/lib/storage'

describe('object storage', () => {
  it('turns on only when a bucket is set', () => {
    expect(objectStorageEnabled({})).toBe(false)
    expect(objectStorageEnabled({ S3_BUCKET: '' })).toBe(false)
    expect(objectStorageEnabled({ S3_BUCKET: 'reatics-media' })).toBe(true)
  })
})
