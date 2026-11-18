import { describe, expect, it } from 'vitest'

import { availabilityStackClass, factStackClass } from '@/lib/factStack'

describe('fact stack class', () => {
  it('keeps one column until the tablet width', () => {
    expect(factStackClass).toContain('facts-stack')
    expect(factStackClass).toContain('grid-cols-1')
    expect(factStackClass).toContain('md:grid-cols-3')
    expect(factStackClass).not.toContain('sm:grid-cols-3')
    expect(availabilityStackClass).toContain('grid-cols-1')
    expect(availabilityStackClass).not.toContain('sm:grid-cols-2')
  })
})
