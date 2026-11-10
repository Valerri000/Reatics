'use server'

import { getPayload } from 'payload'

import { reportErrors, reportPayload, type ListingReportInput } from '@/lib/listingReport'
import config from '@/payload.config'

export async function sendListingReport(input: ListingReportInput) {
  const errors = reportErrors(input)
  if (Object.keys(errors).length > 0) return { ok: false as const, errors }
  const data = reportPayload(input)
  if (!data) return { ok: false as const, errors: { errorType: 'Choose an error type.' } }
  const payload = await getPayload({ config })
  await payload.create({
    collection: 'listing-reports',
    data,
    overrideAccess: false,
  })
  return { ok: true as const }
}
