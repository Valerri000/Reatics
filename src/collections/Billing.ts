import type { CollectionConfig } from 'payload'

import { canBill } from '@/lib/roles'

export const Billing: CollectionConfig = {
  slug: 'billing',
  labels: {
    singular: 'Billing action',
    plural: 'Billing',
  },
  admin: {
    useAsTitle: 'action',
    defaultColumns: ['action', 'amount'],
  },
  access: {
    read: ({ req: { user } }) => canBill(user),
    create: ({ req: { user } }) => canBill(user),
    update: ({ req: { user } }) => canBill(user),
    delete: ({ req: { user } }) => canBill(user),
  },
  fields: [
    {
      name: 'action',
      type: 'select',
      required: true,
      options: [{ label: 'Refund', value: 'refund' }],
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
    },
    {
      name: 'note',
      type: 'textarea',
    },
  ],
}
