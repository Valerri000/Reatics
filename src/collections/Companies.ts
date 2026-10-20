import type { CollectionConfig } from 'payload'

import { isStaff } from '@/lib/roles'

export const Companies: CollectionConfig = {
  slug: 'companies',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name'],
  },
  access: {
    read: ({ req: { user } }) => isStaff(user),
    create: ({ req: { user } }) => isStaff(user),
    update: ({ req: { user } }) => isStaff(user),
    delete: ({ req: { user } }) => isStaff(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
