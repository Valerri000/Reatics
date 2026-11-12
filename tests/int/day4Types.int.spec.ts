import { describe, expect, it } from 'vitest'

import { chooseKind, coworkingTypes, emptyMapFilters, leaseTypes, saleTypes, typesForKind } from '@/lib/mapFilters'

describe('map type lists', () => {
  it('changes with sale, lease, and coworking', () => {
    expect(typesForKind('sale')).toEqual([...saleTypes])
    expect(typesForKind('lease')).toEqual([...leaseTypes])
    expect(typesForKind('coworking')).toEqual([...coworkingTypes])
    expect(typesForKind('')).toEqual([])
    expect(saleTypes).toContain('Industrial/flex')
    expect(saleTypes).toContain('Shopping center')
    expect(saleTypes).toContain('Multi-family')
    expect(leaseTypes).toContain('Industrial')
    expect(leaseTypes).toContain('Flex')
    expect(leaseTypes).not.toContain('Industrial/flex')
    expect(coworkingTypes).toEqual(['1–2', '3–4', '5–10', '11–20', '25+'])
    const next = chooseKind({ ...emptyMapFilters(), kind: 'lease', propertyType: 'Flex' }, 'sale')
    expect(next.kind).toBe('sale')
    expect(next.propertyType).toBe('')
    const kept = chooseKind({ ...emptyMapFilters(), kind: 'sale', propertyType: 'Office' }, 'lease')
    expect(kept.propertyType).toBe('Office')
  })
})
