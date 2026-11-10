import type { CollectionConfig } from 'payload'

import { recordDelete } from '@/lib/audit'
import { reportErrorTypes } from '@/lib/listingReport'
import { canModerate } from '@/lib/roles'

export const ListingReports: CollectionConfig = {
  slug: 'listing-reports',
  labels: {
    singular: 'Listing report',
    plural: 'Listing reports',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'errorType', 'createdAt'],
  },
  access: {
    admin: ({ req: { user } }) => canModerate(user),
    read: ({ req: { user } }) => canModerate(user),
    create: () => true,
    update: () => false,
    delete: ({ req: { user } }) => canModerate(user),
  },
  hooks: {
    afterDelete: [recordDelete],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'errorType',
      type: 'select',
      required: true,
      options: reportErrorTypes.map((item) => ({ label: item.label, value: item.value })),
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'listing',
      type: 'relationship',
      relationTo: 'listings',
      required: true,
    },
  ],
}
