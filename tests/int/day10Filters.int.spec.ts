import { describe, expect, it } from 'vitest'

import { launchFilterLists } from '@/lib/phaseCMilestone'

describe('launch filters', () => {
  it('changes the type list with sale, lease, and coworking', () => {
    const lists = launchFilterLists()
    expect(lists.filters).toContain('kind')
    expect(lists.filters).toContain('propertyType')
    expect(lists.sale).toContain('Office')
    expect(lists.lease).toContain('Flex')
    expect(lists.coworking).toHaveLength(5)
    expect(lists.coworking).not.toEqual(lists.sale)
    expect(lists.coworking).not.toEqual(lists.lease)
  })
})
