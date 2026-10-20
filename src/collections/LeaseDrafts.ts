import type { CollectionConfig } from 'payload'

import { isStaff } from '@/lib/roles'

export const LeaseDrafts: CollectionConfig = {
  slug: 'lease-drafts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'deal'],
  },
  access: {
    read: ({ req: { user } }) => isStaff(user),
    create: ({ req: { user } }) => isStaff(user),
    update: ({ req: { user } }) => isStaff(user),
    delete: ({ req: { user } }) => isStaff(user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'deal',
      type: 'relationship',
      relationTo: 'deals',
    },
  ],
}
