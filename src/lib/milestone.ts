import {
  IDLE_TIMEOUT_MS,
  LOCK_DURATION_MS,
  MAX_LOGIN_ATTEMPTS,
  MAX_SESSION_MS,
  MIN_PASSWORD_LENGTH,
} from '@/lib/session'

import { adminRoles, phase2Tables } from '@/lib/diagram'

import { sampleCity, sampleListing, sampleRedirect } from '@/lib/samples'

export const stagingUrl = 'https://18.118.84.127'

export const milestoneItems = [
  { id: 'staging-url', label: 'Staging URL opens', status: 'ready' },
  {
    id: 'company-github',
    label: 'Repository is in the company GitHub organization, with the company email as owner',
    status: 'waiting',
  },
  { id: 'sign-in', label: 'Sign-in, sign-out, lockout, and session timeout work', status: 'ready' },
  {
    id: 'roles',
    label: 'Owner, Content manager, and Moderator roles are enforced',
    status: 'ready',
  },
  { id: 'diagram', label: 'Database diagram is in the repository', status: 'ready' },
  { id: 'records', label: 'Listing, SEO, and redirect records exist', status: 'ready' },
  { id: 'phase-2', label: 'Phase 2 tables exist and are empty of workflow', status: 'ready' },
  {
    id: 'design',
    label:
      'Design direction is confirmed for homepage, navigation, search, listing, city, and broker',
    status: 'ready',
  },
  { id: 'tokens', label: 'Tailwind tokens match that direction', status: 'ready' },
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

export const phase2WorkflowFields = ['status', 'workflow'] as const

export const emptyPhase2Tables = phase2Tables

export const designScreens = [
  { id: 'homepage', surface: 'staging home' },
  { id: 'navigation', surface: 'header and footer' },
  { id: 'search', surface: 'after this phase' },
  { id: 'listing', surface: 'admin listing' },
  { id: 'city', surface: 'admin city page' },
  { id: 'broker', surface: 'brokers page' },
] as const

export const directionTokens = [
  '--color-brand: #bf1000',
  '--color-brand-deep: #a00e18',
  '--color-accent: #f56d1b',
  "--font-sans: 'Nunito Sans', sans-serif",
  '--radius-control: 0px',
] as const

export function waitingMilestones() {
  return milestoneItems.filter((item) => item.status === 'waiting')
}
