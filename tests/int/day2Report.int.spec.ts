import { describe, expect, it } from 'vitest'

import { ListingReports } from '@/collections/ListingReports'
import { reportErrors, reportPayload, reportReady } from '@/lib/listingReport'
import type { RoleUser } from '@/lib/roles'

function allow(access: unknown, user: RoleUser) {
  if (typeof access !== 'function') throw new Error('missing access')
  return access({ req: { user } })
}

const report = {
  listingId: 4,
  name: 'Ada',
  email: 'ada@example.com',
  errorType: 'incorrect-address',
  description: 'The suite number is wrong.',
}

describe('listing report', () => {
  it('stores the name, email, error type, and description', () => {
    expect(reportReady(report)).toBe(true)
    expect(reportPayload(report)).toEqual({
      listing: 4,
      name: 'Ada',
      email: 'ada@example.com',
      errorType: 'incorrect-address',
      description: 'The suite number is wrong.',
    })
    const errors = reportErrors({ listingId: 4, name: '', email: 'ada', errorType: '', description: '' })
    expect(errors.name).toBe('Enter your name.')
    expect(errors.email).toBe('Enter a valid email address.')
    expect(errors.errorType).toBe('Choose an error type.')
    expect(errors.description).toBe('Enter a description.')
  })

  it('lets a visitor file a report and a moderator read it', () => {
    expect(ListingReports.slug).toBe('listing-reports')
    expect(allow(ListingReports.access?.create, null)).toBe(true)
    expect(allow(ListingReports.access?.update, null)).toBe(false)
    expect(allow(ListingReports.access?.read, null)).toBe(false)
    expect(allow(ListingReports.access?.read, { adminRole: 'moderator' })).toBe(true)
    expect(allow(ListingReports.access?.read, { adminRole: 'content-manager' })).toBe(false)
    const names = ListingReports.fields.map((field) => ('name' in field ? field.name : ''))
    expect(names).toEqual(['name', 'email', 'errorType', 'description', 'listing'])
  })
})
