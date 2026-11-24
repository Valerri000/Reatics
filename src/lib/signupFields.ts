import type { AccountRole } from '@/lib/account'
import { asksForDre } from '@/lib/dreRequirement'
import { requiresReferral } from '@/lib/referralRule'
import { MIN_PASSWORD_LENGTH } from '@/lib/session'

export type SignupField =
  | 'firstName'
  | 'lastName'
  | 'company'
  | 'jobTitle'
  | 'mobilePhone'
  | 'officePhone'
  | 'phone'
  | 'email'
  | 'dreNumber'
  | 'password'
  | 'confirm'

const paidFields: SignupField[] = [
  'firstName',
  'lastName',
  'company',
  'jobTitle',
  'mobilePhone',
  'officePhone',
  'email',
  'dreNumber',
  'password',
  'confirm',
]

export function signupFieldNames(role: AccountRole): SignupField[] {
  if (role === 'space-seeker') return ['firstName', 'lastName', 'email', 'password', 'confirm']
  if (role === 'coworking') return ['firstName', 'lastName', 'company', 'phone', 'email', 'password', 'confirm']
  return paidFields
}

const emptyCopy: Record<SignupField, string> = {
  firstName: 'Enter your first name.',
  lastName: 'Enter your last name.',
  company: 'Enter your company.',
  jobTitle: 'Enter your title.',
  mobilePhone: 'Enter your mobile phone.',
  officePhone: 'Enter your office phone.',
  phone: 'Enter your phone.',
  email: 'Enter your email address.',
  dreNumber: 'Enter your DRE number.',
  password: 'Enter your password.',
  confirm: 'Enter your password.',
}

export function signupFormErrors(
  role: AccountRole,
  form: Partial<Record<SignupField, string>>,
  accepted: boolean,
) {
  const errors: Partial<Record<SignupField | 'referral', string>> = {}
  for (const name of signupFieldNames(role)) {
    if (!form[name]?.trim()) errors[name] = emptyCopy[name]
  }
  if (!asksForDre(role)) delete errors.dreNumber
  if (form.password && form.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = 'Use at least 8 characters.'
  }
  if (form.confirm && form.password !== form.confirm) errors.confirm = 'Passwords do not match.'
  if (requiresReferral(role) && !accepted) errors.referral = 'The referral agreement is required.'
  return errors
}
