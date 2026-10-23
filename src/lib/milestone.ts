import {
  IDLE_TIMEOUT_MS,
  LOCK_DURATION_MS,
  MAX_LOGIN_ATTEMPTS,
  MAX_SESSION_MS,
  MIN_PASSWORD_LENGTH,
} from '@/lib/session'

import { adminRoles } from '@/lib/diagram'

import { sampleCity, sampleListing, sampleRedirect } from '@/lib/samples'

export const stagingUrl = 'https://18.118.84.127'

export const milestoneItems = [
  { id: 'staging-url', label: 'Staging URL opens' },
  {
    id: 'company-github',
    label: 'Repository is in the company GitHub organization, with the company email as owner',
  },
  { id: 'sign-in', label: 'Sign-in, sign-out, lockout, and session timeout work' },
  { id: 'roles', label: 'Owner, Content manager, and Moderator roles are enforced' },
  { id: 'diagram', label: 'Database diagram is in the repository' },
  { id: 'records', label: 'Listing, SEO, and redirect records exist' },
  { id: 'phase-2', label: 'Phase 2 tables exist and are empty of workflow' },
  {
    id: 'design',
    label:
      'Design direction is confirmed for homepage, navigation, search, listing, city, and broker',
  },
  { id: 'tokens', label: 'Tailwind tokens match that direction' },
] as const

export function stagingOpens(status: number) {
  return status === 200
}

export const sessionRules = {
  idleMs: IDLE_TIMEOUT_MS,
  maxMs: MAX_SESSION_MS,
  lockMs: LOCK_DURATION_MS,
  attempts: MAX_LOGIN_ATTEMPTS,
  passwordLength: MIN_PASSWORD_LENGTH,
}

export const staffRoles = adminRoles.map((role) => role.label)

export const diagramPath = 'docs/entity-diagram.md'

export const reviewRecords = {
  listing: sampleListing.slug,
  city: sampleCity.slug,
  redirect: sampleRedirect.fromPath,
}
