import type { Where } from 'payload'

import { canEditMarketing, type RoleUser } from '@/lib/roles'

export function wantsPreview(value: unknown) {
  return value === '1' || value === 'true'
}

export function canPreviewDraft(user: RoleUser, preview: boolean) {
  return preview && canEditMarketing(user)
}

export function recordWhere(slug: string, allowDraft: boolean): Where {
  if (allowDraft) return { slug: { equals: slug } }
  return {
    and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }],
  }
}
