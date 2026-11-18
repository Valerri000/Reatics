import { describe, expect, it } from 'vitest'

import { clearedDrawnArea } from '@/lib/drawnClear'

describe('cleared drawn area', () => {
  it('drops every stored point', () => {
    expect(
      clearedDrawnArea([
        { latitude: 34.1, longitude: -118.2 },
        { latitude: 34.2, longitude: -118.3 },
      ]),
    ).toEqual([])
  })
})
