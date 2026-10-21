import type { CollectionConfig } from 'payload'

import { recordDelete } from '@/lib/audit'
import { isStaff } from '@/lib/roles'

export const CompanyMembers: CollectionConfig = {
  slug: 'company-members',
  admin: {
    defaultColumns: ['company', 'user'],
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
      name: 'company',
      type: 'relationship',
      relationTo: 'companies',
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
