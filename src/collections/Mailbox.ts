import type { CollectionConfig } from 'payload'

import { recordDelete } from '@/lib/audit'
import { canBill } from '@/lib/roles'

export const Mailbox: CollectionConfig = {
  slug: 'mailbox',
  labels: {
    singular: 'Mailbox notice',
    plural: 'Mailbox',
  },
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['kind', 'toAddress', 'status'],
  },
  access: {
    read: ({ req: { user } }) => canBill(user),
    create: () => false,
    update: () => false,
    delete: ({ req: { user } }) => canBill(user),
  },
  hooks: {
    afterDelete: [recordDelete],
  },
  fields: [
    {
      name: 'kind',
      type: 'select',
      required: true,
      options: [{ label: 'Grace', value: 'grace' }],
    },
    {
      name: 'toAddress',
      type: 'email',
      required: true,
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'stored',
      options: [{ label: 'Stored', value: 'stored' }],
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
    },
  ],
}
