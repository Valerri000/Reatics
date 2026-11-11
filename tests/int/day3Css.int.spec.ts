import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync('src/app/(frontend)/styles.css', 'utf8')

describe('map image rules', () => {
  it('lets the map tiles keep their size', () => {
    expect(css).toContain('.map-stage')
    expect(css).toContain('img.map-fallback')
    expect(css).toContain('.mapboxgl-map img')
    expect(css).toContain('max-width: none')
  })
})
