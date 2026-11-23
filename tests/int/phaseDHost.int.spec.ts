import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { phaseDHostCheck } from '@/lib/phaseDHost'

const note = readFileSync('docs/phase-d-day-1-host.md', 'utf8')

describe('phase D review host', () => {
  it('names the staging home and the admin', () => {
    const host = phaseDHostCheck()
    expect(host.home).toBe('https://18.118.84.127')
    expect(host.admin).toBe('https://18.118.84.127/admin')
    expect(note).toContain(host.home)
    expect(note).toContain(host.admin)
    expect(note).toContain('owner')
    expect(note).toContain('content manager')
    expect(note).toContain('moderator')
    expect(note).toContain('space seeker')
  })
})
