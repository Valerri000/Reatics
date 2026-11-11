import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { mapRobots, mapTitle } from '@/lib/mapStage'

const page = readFileSync('src/app/(frontend)/map/page.tsx', 'utf8')

describe('map route', () => {
  it('is noindex and is not a city page', () => {
    expect(mapTitle).toBe('Map')
    expect(mapRobots.index).toBe(false)
    expect(page).toContain('title: mapTitle')
    expect(page).toContain('robots: mapRobots')
    expect(page).toContain('storedMapPins')
    expect(page).not.toContain('Glendale')
  })
})
