import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { phase2Tables } from '@/lib/diagram'
import {
  designScreens,
  diagramPath,
  directionTokens,
  emptyPhase2Tables,
  milestoneItems,
  phase2WorkflowFields,
  reviewRecords,
  sessionRules,
  staffRoles,
  stagingCheck,
  stagingOpens,
  stagingUrl,
  waitingMilestones,
} from '@/lib/milestone'

describe('day 10 milestone', () => {
  it('names every item and leaves the company GitHub owner waiting', () => {
    expect(milestoneItems.map((item) => item.id)).toEqual([
      'staging-url',
      'company-github',
      'sign-in',
      'roles',
      'diagram',
      'records',
      'phase-2',
      'design',
      'tokens',
    ])
    expect(waitingMilestones().map((item) => item.id)).toEqual(['company-github'])
    expect(stagingUrl).toBe('https://18.118.84.127')
    expect(stagingOpens(200)).toBe(true)
    expect(stagingOpens(503)).toBe(false)
    expect(stagingCheck).toEqual({ day: '2026-10-23', path: '/health', status: 200 })
  })

  it('keeps the session rules and the staff roles', () => {
    expect(sessionRules).toEqual({
      idleMs: 30 * 60 * 1000,
      maxMs: 8 * 60 * 60 * 1000,
      lockMs: 15 * 60 * 1000,
      attempts: 5,
      passwordLength: 8,
    })
    expect(staffRoles).toEqual(['Owner', 'Content manager', 'Moderator'])
  })

  it('points at the diagram, the samples, the screens, and the tokens', () => {
    expect(existsSync(diagramPath)).toBe(true)
    expect(reviewRecords).toEqual({
      listing: '201-n-brand',
      city: 'glendale',
      redirect: '/listings/brand-glendale',
    })
    expect(designScreens.map((screen) => screen.id)).toEqual([
      'homepage',
      'navigation',
      'search',
      'listing',
      'city',
      'broker',
    ])
    expect(emptyPhase2Tables).toEqual(phase2Tables)
    const css = readFileSync('src/app/(frontend)/styles.css', 'utf8')
    for (const token of directionTokens) expect(css).toContain(token)
    const phase2Files = [
      'src/collections/Companies.ts',
      'src/collections/CompanyMembers.ts',
      'src/collections/Deals.ts',
      'src/collections/DealParticipants.ts',
      'src/collections/ScreeningRequests.ts',
      'src/collections/LeaseDrafts.ts',
      'src/collections/SignedDocuments.ts',
    ]
    expect(phase2Files).toHaveLength(phase2Tables.length)
    for (const file of phase2Files) {
      const source = readFileSync(file, 'utf8')
      for (const field of phase2WorkflowFields) {
        expect(source).not.toContain(`name: '${field}'`)
      }
    }
  })
})
