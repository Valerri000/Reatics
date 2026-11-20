import { describe, expect, it } from 'vitest'

import { coworkingShowsOfficePhone } from '@/lib/phaseCMilestone'

describe('coworking card phone', () => {
  it('shows only the office number', () => {
    expect(
      coworkingShowsOfficePhone({
        kind: 'coworking',
        slug: '1000-e-walnut',
        brokerName: 'Hidden Provider',
        brokerPhone: '555-0100',
        brokerEmail: 'hidden@provider.test',
      }),
    ).toBe('1-888-518-9168')
  })
})
