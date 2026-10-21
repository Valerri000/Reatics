import type { CollectionConfig } from 'payload'

import { recordDelete } from '@/lib/audit'
import { isStaff } from '@/lib/roles'

export const SignedDocuments: CollectionConfig = {
  slug: 'signed-documents',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'leaseDraft'],
  },
  access: {
    read: ({ req: { user } }) => isStaff(user),
    create: ({ req: { user } }) => isStaff(user),
    update: ({ req: { user } }) => isStaff(user),
    delete: ({ req: { user } }) => isStaff(user),
  },
  hooks: {
    afterDelete: [recordDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'leaseDraft',
      type: 'relationship',
      relationTo: 'lease-drafts',
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
