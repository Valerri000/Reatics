import { describe, expect, it } from 'vitest'

import { companyEmailWaits } from '@/lib/companyWait'
import { waitingMilestones } from '@/lib/milestone'

describe('company email', () => {
  it('keeps the GitHub owner open', () => {
    expect(companyEmailWaits.map((item) => item.id)).toEqual(['github-organization'])
    expect(companyEmailWaits[0].waiting).toContain('company email')
    expect(companyEmailWaits[0].untilThen).toContain('Phase B')
    expect(waitingMilestones().map((item) => item.id)).toEqual(['company-github'])
  })
})
