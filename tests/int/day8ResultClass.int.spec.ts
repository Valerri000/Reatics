import { describe, expect, it } from 'vitest'

import { resultStackClass } from '@/lib/resultStack'

describe('result stack class', () => {
  it('stacks the result cards in one column', () => {
    expect(resultStackClass).toContain('results-stack')
    expect(resultStackClass).toContain('flex-col')
    expect(resultStackClass).not.toContain('grid-cols-')
  })
})
