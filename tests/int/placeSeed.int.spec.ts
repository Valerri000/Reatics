import { describe, expect, it } from 'vitest'

import { publicPath } from '@/lib/paths'
import { publishErrors } from '@/lib/publish'
import { sampleCity, sampleOffice } from '@/lib/samples'

describe('place samples', () => {
  it('publishes Glendale as a city at the same address', () => {
    expect(sampleCity.status).toBe('published')
    expect(sampleCity.slug).toBe('glendale')
    expect(sampleCity.h1).toBe('Glendale')
    expect(publicPath('cities', sampleCity.slug)).toBe('/glendale')
    expect(sampleCity.canonicalUrl).toBe('/glendale')
    expect(publishErrors(sampleCity, 'title', 'content')).toEqual([])
  })

  it('publishes Office on the same template', () => {
    expect(sampleOffice.status).toBe('published')
    expect(sampleOffice.slug).toBe('office')
    expect(sampleOffice.h1).toBe('Office')
    expect(publicPath('property-types', sampleOffice.slug)).toBe('/office')
    expect(sampleOffice.canonicalUrl).toBe('/office')
    expect(publishErrors(sampleOffice, 'title', 'content')).toEqual([])
  })
})
