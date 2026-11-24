import { asksForDre } from '@/lib/dreRequirement'
import { referralAccepted } from '@/lib/referralRule'

export type SignupViolation = { message: string; path: string }

export function signupViolations(input: {
  role?: string | null
  dreNumber?: string | null
  referralAccepted?: boolean | null
}) {
  const errors: SignupViolation[] = []
  if (asksForDre(input.role) && !input.dreNumber?.trim()) {
    errors.push({ message: 'Enter your DRE number.', path: 'dreNumber' })
  }
  if (!referralAccepted(input.role, input.referralAccepted)) {
    errors.push({ message: 'The referral agreement is required.', path: 'referralAccepted' })
  }
  return errors
}
