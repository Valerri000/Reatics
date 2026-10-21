import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { backupAccount, backupRetentionDays, backupSchedule } from '@/lib/backups'

describe('database backups', () => {
  it('keeps a daily company backup for 30 days', () => {
    expect(backupSchedule).toBe('daily')
    expect(backupRetentionDays).toBe(30)
    expect(backupAccount).toBe('company')
    const note = readFileSync('docs/backups.md', 'utf8')
    expect(note).toContain('30 days')
    expect(note).toContain('company account')
    expect(note).toContain('every day')
  })
})
