import type { CollectionConfig } from 'payload'

import { isStaff } from '@/lib/roles'

export const ScreeningRequests: CollectionConfig = {
  slug: 'screening-requests',
  admin: {
    defaultColumns: ['deal'],
  },
  access: {
    read: ({ req: { user } }) => isStaff(user),
    create: ({ req: { user } }) => isStaff(user),
    update: ({ req: { user } }) => isStaff(user),
    delete: ({ req: { user } }) => isStaff(user),
  },
  fields: [
    {
      name: 'deal',
      type: 'relationship',
      relationTo: 'deals',
    },
    {
      name: 'note',
      type: 'textarea',
    },
  ],
}
