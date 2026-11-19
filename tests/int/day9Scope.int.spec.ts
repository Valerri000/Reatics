import { describe, expect, it } from 'vitest'

import { outsidePhaseC } from '@/lib/reviewScope'

describe('intentionally not built', () => {
  it('keeps the later work outside this phase', () => {
    expect(outsidePhaseC).toContain('Stripe subscriptions')
    expect(outsidePhaseC).toContain('Favorites folders')
    expect(outsidePhaseC).toContain('Broker directory')
    expect(outsidePhaseC).toContain('Drupal migration')
    expect(outsidePhaseC).toContain('Terms and Privacy')
    expect(outsidePhaseC).toContain('contact email sending')
    expect(outsidePhaseC).toContain('Mapbox commercial license')
  })
})
