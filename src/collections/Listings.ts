import type { CollectionConfig } from 'payload'

import { seoFieldList } from '@/fields/seo'
import { recordDelete } from '@/lib/audit'
import { canModerate } from '@/lib/roles'
import { storeSlugRedirect } from '@/lib/slugRedirect'

export const Listings: CollectionConfig = {
  slug: 'listings',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'kind', 'city'],
  },
  access: {
    read: ({ req: { user } }) => canModerate(user),
    create: ({ req: { user } }) => canModerate(user),
    update: ({ req: { user } }) => canModerate(user),
    delete: ({ req: { user } }) => canModerate(user),
  },
  hooks: {
    afterChange: [(args) => storeSlugRedirect({ ...args, collection: 'listings' })],
    afterDelete: [recordDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'kind',
      type: 'select',
      required: true,
      options: [
        { label: 'For sale', value: 'sale' },
        { label: 'For lease', value: 'lease' },
        { label: 'Coworking', value: 'coworking' },
      ],
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'street',
      type: 'text',
    },
    {
      name: 'city',
      type: 'text',
    },
    {
      name: 'state',
      type: 'text',
    },
    {
      name: 'postalCode',
      type: 'text',
    },
    {
      name: 'propertyType',
      type: 'text',
      label: 'Property type',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    ...seoFieldList,
  ],
}
