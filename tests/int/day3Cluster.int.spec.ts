import { describe, expect, it } from 'vitest'

import { groupMapPins } from '@/lib/mapPins'

const nearby = [
  { slug: 'brand', latitude: 34.1478, longitude: -118.2551 },
  { slug: 'brand-next', latitude: 34.148, longitude: -118.2554 },
]
const distant = { slug: 'market', latitude: 37.7749, longitude: -122.4194 }

describe('map pin groups', () => {
  it('clusters a dense area and keeps a normal area as single pins', () => {
    const dense = groupMapPins(nearby, 8)
    expect(dense).toHaveLength(1)
    expect(dense[0]).toMatchObject({ kind: 'cluster', count: 2 })

    const spaced = groupMapPins([...nearby, distant], 14)
    expect(spaced.every((pin) => pin.kind === 'pin')).toBe(true)
    expect(spaced).toHaveLength(3)

    const mixed = groupMapPins([...nearby, distant], 8)
    expect(mixed.filter((pin) => pin.kind === 'cluster')).toHaveLength(1)
    expect(mixed.filter((pin) => pin.kind === 'pin')).toHaveLength(1)
  })
})
