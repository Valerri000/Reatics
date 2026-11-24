import { describe, expect, it } from 'vitest'

import { referralAccepted, referralScopeSentence, referralWaitingLabel, requiresReferral } from '@/lib/referralRule'

describe('coworking referral', () => {
  it('requires the checkbox and keeps the scope sentence labeled as waiting', () => {
    expect(requiresReferral('coworking')).toBe(true)
    expect(requiresReferral('broker')).toBe(false)
    expect(referralAccepted('coworking', false)).toBe(false)
    expect(referralAccepted('coworking', true)).toBe(true)
    expect(referralAccepted('space-seeker', false)).toBe(true)
    expect(referralWaitingLabel).toContain('Waiting')
    expect(referralScopeSentence).toContain('10%')
    expect(referralScopeSentence).toContain('1-888-518-9168')
    expect(referralScopeSentence).toContain('not shown')
  })
})
