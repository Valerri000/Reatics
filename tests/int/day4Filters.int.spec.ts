import { describe, expect, it } from 'vitest'

import { emptyMapFilters, filterMapListings, filtersFromQuery, type MapListing } from '@/lib/mapFilters'

const office: MapListing = {
  href: '/listings/office',
  kind: 'lease',
  price: 4500,
  propertyType: 'Office',
  squareFootage: 12500,
  keywords: 'office glendale',
  title: 'Office for lease',
  street: '201 N Brand Blvd',
  city: 'Glendale',
  state: 'CA',
  county: 'Los Angeles',
  postalCode: '91203',
  latitude: 34.1478,
  longitude: -118.2551,
}

const sale: MapListing = {
  href: '/listings/sale',
  kind: 'sale',
  price: 2500000,
  propertyType: 'Shopping center',
  squareFootage: 40000,
  keywords: 'retail',
  city: 'Pasadena',
  state: 'CA',
  county: 'Los Angeles',
  postalCode: '91101',
  latitude: 34.147,
  longitude: -118.15,
}

const desks: MapListing = {
  href: '/listings/desks',
  kind: 'coworking',
  price: 350,
  propertyType: '1-2',
  squareFootage: 120,
  keywords: 'desk',
  city: 'Glendale',
  state: 'CA',
  county: 'Los Angeles',
  postalCode: '91203',
  latitude: 34.15,
  longitude: -118.26,
}

describe('map launch filters', () => {
  it('filters by kind, type, price, size, keywords, and place', () => {
    const filters = emptyMapFilters()
    expect(filterMapListings([office, sale, desks], filters).map((listing) => listing.href)).toEqual([
      office.href,
      sale.href,
      desks.href,
    ])
    expect(filterMapListings([office, sale], { ...filters, kind: 'sale' })).toEqual([sale])
    expect(filterMapListings([office, sale], { ...filters, kind: 'lease', propertyType: 'Office' })).toEqual([office])
    expect(filterMapListings([desks], { ...filters, kind: 'coworking', propertyType: '1–2' })).toEqual([desks])
    expect(filterMapListings([office, sale], { ...filters, priceMax: '5000' })).toEqual([office])
    expect(filterMapListings([office, sale], { ...filters, priceMin: '1000000' })).toEqual([sale])
    expect(filterMapListings([office, desks], { ...filters, squareFootageMin: '10000' })).toEqual([office])
    expect(filterMapListings([office, sale], { ...filters, keywords: 'glendale' })).toEqual([office])
    expect(filterMapListings([office, sale], { ...filters, place: '91203' })).toEqual([office])
    expect(filterMapListings([office, sale], { ...filters, place: 'Pasadena' })).toEqual([sale])
    expect(filterMapListings([office], { ...filters, place: 'Los Angeles' })).toEqual([office])
    expect(filterMapListings([office], { ...filters, place: 'CA' })).toEqual([office])
    expect(filtersFromQuery({ city: 'Glendale', kind: 'lease', type: 'Office' })).toMatchObject({
      place: 'Glendale',
      kind: 'lease',
      propertyType: 'Office',
    })
    expect(filtersFromQuery({ kind: 'coworking', use: '1-2' }).propertyType).toBe('1–2')
  })
})
