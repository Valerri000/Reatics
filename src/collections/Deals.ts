import type { CollectionConfig } from 'payload'

import { isStaff } from '@/lib/roles'

export const Deals: CollectionConfig = {
  slug: 'deals',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'company', 'listing'],
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
      required: true,
    },
    {
      name: 'company',
      type: 'relationship',
      relationTo: 'companies',
    },
    {
      name: 'listing',
      type: 'relationship',
      relationTo: 'listings',
    },
  ],
}
