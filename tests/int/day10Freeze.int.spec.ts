import { describe, expect, it } from 'vitest'

import { phaseCFrozen, phaseCPushed, stagingOrigin } from '@/lib/phaseCFreeze'

describe('phase C freeze', () => {
  it('keeps the revision local', () => {
    expect(phaseCFrozen).toBe(true)
    expect(phaseCPushed).toBe(false)
    expect(stagingOrigin).toBe('https://18.118.84.127')
  })
})
