import { describe, expect, it } from 'vitest'

import {
  emptyPlace,
  listingCardFields,
  listingCityLine,
  listingsForCity,
  listingsForType,
  mapLabel,
  placeCardLimit,
  reservedMapPath,
  servePlace,
} from '@/lib/placeList'

const glendaleOffice = {
  slug: '201-n-brand',
  title: '201 N Brand',
  kind: 'lease' as const,
  price: 4500,
  street: '201 N Brand Blvd',
  city: 'Glendale',
  state: 'CA',
  postalCode: '91203',
  propertyType: 'Office',
  imageAlt: 'Office building at 201 N Brand in Glendale',
}

const pasadenaOffice = {
  ...glendaleOffice,
  slug: '260-s-los-robles',
  title: '260 S Los Robles',
  city: 'Pasadena',
  postalCode: '91101',
}

const glendaleRetail = {
  ...glendaleOffice,
  slug: '100-brand',
  title: '100 Brand',
  propertyType: 'Retail',
}

describe('place listings', () => {
  it('keeps Glendale and Office to a short set of matching cards', () => {
    const listings = [glendaleOffice, pasadenaOffice, glendaleRetail]
    expect(listingsForCity(listings, 'Glendale').map((listing) => listing.slug)).toEqual([
      '201-n-brand',
      '100-brand',
    ])
    expect(listingsForType(listings, 'office').map((listing) => listing.slug)).toEqual([
      '201-n-brand',
      '260-s-los-robles',
    ])
    expect(placeCardLimit).toBe(6)
    const cards = listingCardFields(glendaleOffice)
    expect(cards.href).toBe('/listings/201-n-brand')
    expect(cards.cityLine).toBe('Glendale, CA 91203')
    expect(cards.imageUrl).toBe('/direction-photo.svg')
    expect(listingCityLine({ city: 'Glendale', state: 'CA', postalCode: '91203' })).toBe(
      'Glendale, CA 91203',
    )
  })

  it('reserves the map link and the empty state', () => {
    expect(reservedMapPath('city', 'Glendale')).toBe('/map?city=Glendale')
    expect(reservedMapPath('property-type', 'Office')).toBe('/map?type=Office')
    expect(mapLabel).toBe('View on the map')
    expect(emptyPlace).toBe('No listings yet.')
    expect(listingsForCity([], 'Glendale')).toEqual([])
    expect(servePlace({ status: 'published' })).toBe(true)
    expect(servePlace({ status: 'draft' })).toBe(false)
    expect(servePlace(null)).toBe(false)
  })
})
