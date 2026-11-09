import { describe, expect, it } from 'vitest'

import { Listings } from '@/collections/Listings'

function field(name: string) {
  return Listings.fields.find((item) => 'name' in item && item.name === name)
}

describe('listing map fields', () => {
  it('keeps kind, price, address, and the new map fields', () => {
    expect(field('kind')).toMatchObject({ type: 'select', required: true })
    expect(field('propertyType')).toMatchObject({ type: 'text' })
    expect(field('price')).toMatchObject({ type: 'number' })
    expect(field('squareFootage')).toMatchObject({ type: 'number' })
    expect(field('keywords')).toMatchObject({ type: 'text' })
    expect(field('street')).toMatchObject({ type: 'text' })
    expect(field('city')).toMatchObject({ type: 'text' })
    expect(field('state')).toMatchObject({ type: 'text' })
    expect(field('county')).toMatchObject({ type: 'text' })
    expect(field('postalCode')).toMatchObject({ type: 'text' })
  })
})
