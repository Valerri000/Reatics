import type { Access, CollectionConfig } from 'payload'

import { recordDelete } from '@/lib/audit'
import { canBill } from '@/lib/roles'
import { subscriptionFieldList } from '@/lib/subscriptionFields'

const ownerOnly: Access = ({ req: { user } }) => canBill(user)

export const Subscriptions: CollectionConfig = {
  slug: 'subscriptions',
  labels: {
    singular: 'Subscription',
    plural: 'Subscriptions',
  },
  admin: {
    useAsTitle: 'planId',
    defaultColumns: ['planId', 'status', 'amountCents'],
  },
  access: {
    read: ownerOnly,
    create: () => false,
    update: () => false,
    delete: ownerOnly,
  },
  hooks: {
    afterDelete: [recordDelete],
  },
  fields: subscriptionFieldList,
}
