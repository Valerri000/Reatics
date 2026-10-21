import type { CollectionConfig } from 'payload'

import { isOwner } from '@/lib/roles'

export const auditActions = ['sign-in', 'role-change', 'delete'] as const

export const AuditLog: CollectionConfig = {
  slug: 'audit-log',
  admin: {
    useAsTitle: 'action',
    defaultColumns: ['createdAt', 'actor', 'action', 'target'],
  },
  access: {
    read: ({ req: { user } }) => isOwner(user),
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'actor',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'action',
      type: 'select',
      required: true,
      options: [
        { label: 'Sign in', value: 'sign-in' },
        { label: 'Role change', value: 'role-change' },
        { label: 'Delete', value: 'delete' },
      ],
    },
    {
      name: 'target',
      type: 'text',
      required: true,
    },
  ],
}
