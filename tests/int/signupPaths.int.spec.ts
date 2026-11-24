import { describe, expect, it } from 'vitest'

import { signupPath, signupPaths } from '@/lib/signupPaths'

describe('signup paths', () => {
  it('offers the five account types', () => {
    expect(signupPaths.map((path) => path.id)).toEqual([
      'space-seeker',
      'broker',
      'owner',
      'broker-owner',
      'coworking',
    ])
    expect(signupPaths.map((path) => path.title)).toEqual([
      'Space seeker',
      'Broker',
      'Owner with listings',
      'Broker and owner',
      'Coworking provider',
    ])
    expect(signupPath('broker-owner')?.text).toContain('both paid roles')
    expect(signupPath('missing')).toBeNull()
  })
})
