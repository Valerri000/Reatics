export const referralWaitingLabel = 'Waiting for the coworking referral wording.'

export const referralScopeSentence =
  'I agree that Reatics receives 10% of a signed referral. My contact details are not shown on listings. Inquiries go to 1-888-518-9168.'

export function requiresReferral(role: string | null | undefined) {
  return role === 'coworking'
}

export function referralAccepted(role: string | null | undefined, accepted: boolean | null | undefined) {
  if (!requiresReferral(role)) return true
  return accepted === true
}
