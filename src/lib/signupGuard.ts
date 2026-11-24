import { ValidationError, type CollectionBeforeChangeHook } from 'payload'

import { isOwner } from '@/lib/roles'
import { MIN_PASSWORD_LENGTH } from '@/lib/session'
import { signupViolations } from '@/lib/signupViolations'

export const signupGuard: CollectionBeforeChangeHook = ({ data, originalDoc, operation, req }) => {
  if (!data) return data

  if (!isOwner(req.user)) {
    if (operation === 'create') {
      data.adminRole = null
      data.verified = false
      data.dreValidated = false
    } else {
      delete data.adminRole
      delete data.verified
      delete data.dreValidated
    }
  }

  const role = data.role ?? originalDoc?.role
  const dreNumber = data.dreNumber !== undefined ? data.dreNumber : originalDoc?.dreNumber
  const referral = data.referralAccepted !== undefined ? data.referralAccepted : originalDoc?.referralAccepted
  const changing =
    operation === 'create' ||
    data.role !== undefined ||
    data.dreNumber !== undefined ||
    data.referralAccepted !== undefined
  if (changing) {
    const errors = signupViolations({ role, dreNumber, referralAccepted: referral })
    if (errors.length > 0) throw new ValidationError({ errors })
  }

  if (data.role === 'owner' || data.role === 'broker-owner') data.listsProperties = true
  if (data.role === 'broker' || data.role === 'space-seeker') data.listsProperties = false

  if (
    typeof data.password === 'string' &&
    data.password.length > 0 &&
    data.password.length < MIN_PASSWORD_LENGTH
  ) {
    throw new ValidationError({
      errors: [{ message: 'Use at least 8 characters.', path: 'password' }],
    })
  }

  return data
}
