import { describe, expect, it } from 'vitest'

import { signupFieldNames, signupFormErrors } from '@/lib/signupFields'

const filled = {
  firstName: 'Ada',
  lastName: 'Broker',
  company: 'Reatics',
  jobTitle: 'Broker',
  mobilePhone: '8185550100',
  officePhone: '8185550101',
  phone: '8185550102',
  email: 'ada@example.com',
  dreNumber: '01234567',
  password: 'password123',
  confirm: 'password123',
}

describe('signup fields', () => {
  it('hides the DRE field from a space seeker and requires it for a broker', () => {
    expect(signupFieldNames('space-seeker')).not.toContain('dreNumber')
    expect(signupFieldNames('broker')).toContain('dreNumber')
    expect(signupFieldNames('owner')).toContain('dreNumber')
    expect(signupFieldNames('broker-owner')).toContain('dreNumber')
    expect(signupFieldNames('coworking')).not.toContain('dreNumber')
    expect(signupFormErrors('broker', { ...filled, dreNumber: '' }, false).dreNumber).toBe('Enter your DRE number.')
    expect(signupFormErrors('space-seeker', filled, false).dreNumber).toBeUndefined()
    expect(signupFormErrors('coworking', filled, false).referral).toBe('The referral agreement is required.')
    expect(Object.keys(signupFormErrors('broker', {}, false)).length).toBeGreaterThan(0)
  })
})
