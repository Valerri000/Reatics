import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { signupLayout } from '@/lib/signupLayout'

describe('signup layout', () => {
  it('uses one column on a phone and two columns on a desktop', () => {
    expect(signupLayout.phone).toContain('grid-cols-1')
    expect(signupLayout.desktop).toContain('md:grid-cols-2')
    const role = readFileSync('src/components/auth/RoleView.tsx', 'utf8')
    const details = readFileSync('src/components/auth/DetailsView.tsx', 'utf8')
    expect(role).toContain('signupLayout.phone')
    expect(role).toContain('signupLayout.desktop')
    expect(details).toContain('signupLayout.phone')
    expect(details).toContain('signupLayout.desktop')
  })
})
