import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { portalLayout } from '@/lib/portalLayout'

describe('portal layout', () => {
  it('uses one column on a phone and two columns on a desktop', () => {
    expect(portalLayout.phone).toContain('grid-cols-1')
    expect(portalLayout.desktop).toContain('md:grid-cols-2')
    const screen = readFileSync('src/components/billing/PortalReturn.tsx', 'utf8')
    expect(screen).toContain('portalLayout.phone')
    expect(screen).toContain('portalLayout.desktop')
  })
})
