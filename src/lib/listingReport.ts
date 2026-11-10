export const reportErrorTypes = [
  { value: 'incorrect-price', label: 'Incorrect price' },
  { value: 'incorrect-address', label: 'Incorrect address' },
  { value: 'duplicate', label: 'Duplicate listing' },
  { value: 'other', label: 'Other' },
] as const

export type ReportErrorType = (typeof reportErrorTypes)[number]['value']

export type ReportField = 'name' | 'email' | 'errorType' | 'description'

export type ReportErrors = Partial<Record<ReportField | 'listingId', string>>

export type ListingReportInput = {
  listingId: number
  name: string
  email: string
  errorType: string
  description: string
}

export const reportLogged = 'Your report has been logged.'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function reportErrors(input: ListingReportInput): ReportErrors {
  const errors: ReportErrors = {}
  if (!input.listingId) errors.listingId = 'Choose a listing.'
  if (!input.name.trim()) errors.name = 'Enter your name.'
  const email = input.email.trim()
  if (!email) errors.email = 'Enter your email address.'
  else if (!emailPattern.test(email)) errors.email = 'Enter a valid email address.'
  if (!reportErrorTypes.some((item) => item.value === input.errorType)) {
    errors.errorType = 'Choose an error type.'
  }
  if (!input.description.trim()) errors.description = 'Enter a description.'
  return errors
}

export function reportReady(input: ListingReportInput) {
  return Object.keys(reportErrors(input)).length === 0
}

export function reportPayload(input: ListingReportInput) {
  const errorType = reportErrorTypes.find((item) => item.value === input.errorType)?.value
  if (!errorType) return null
  return {
    listing: input.listingId,
    name: input.name.trim(),
    email: input.email.trim(),
    errorType,
    description: input.description.trim(),
  }
}
