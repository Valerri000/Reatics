import type { CollectionConfig } from 'payload'

import { isStaff } from '@/lib/roles'

export const DealParticipants: CollectionConfig = {
  slug: 'deal-participants',
  admin: {
    defaultColumns: ['deal', 'user'],
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
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
  ],
}
