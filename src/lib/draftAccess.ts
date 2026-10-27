import type { Access } from 'payload'

import { canEditMarketing, canEditPages, type RoleUser } from '@/lib/roles'

export function readPublished(canEdit: (user: RoleUser) => boolean): Access {
  return ({ req: { user } }) => {
    if (canEdit(user)) return true
    return {
      status: {
        equals: 'published',
      },
    }
  }
}

export const readPublishedPages = readPublished(canEditPages)

export const readPublishedMarketing = readPublished(canEditMarketing)

export function isPublicRecord(record: { status?: string | null }) {
  return record.status === 'published'
}
