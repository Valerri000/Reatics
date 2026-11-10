import { describe, expect, it } from 'vitest'

import { Listings } from '@/collections/Listings'

function field(name: string) {
  return Listings.fields.find((item) => 'name' in item && item.name === name)
}

describe('listing page fields', () => {
  it('stores the description, broker, and availabilities on the listing', () => {
    expect(field('description')).toMatchObject({ type: 'textarea' })
    expect(field('availability')).toMatchObject({ type: 'select', defaultValue: 'available' })
    expect(field('brokerName')).toMatchObject({ type: 'text' })
    expect(field('brokerCompany')).toMatchObject({ type: 'text' })
    expect(field('brokerPhone')).toMatchObject({ type: 'text' })
    expect(field('brokerEmail')).toMatchObject({ type: 'email' })
    expect(field('availabilities')).toMatchObject({ type: 'json' })
  })
})
