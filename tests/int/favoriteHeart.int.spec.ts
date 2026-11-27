import { describe, expect, it } from 'vitest'

import { heartAction } from '@/lib/favoriteHeart'

describe('favorite heart', () => {
  it('saves when the member is signed in and asks a visitor to sign in', () => {
    expect(heartAction(true)).toBe('save')
    expect(heartAction(false)).toBe('sign-in')
  })
})
