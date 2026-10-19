import type { CollectionConfig } from 'payload'

import { seoFieldList } from '@/fields/seo'
import { canEditPages } from '@/lib/roles'
import { storeSlugRedirect } from '@/lib/slugRedirect'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => canEditPages(user),
    update: ({ req: { user } }) => canEditPages(user),
    delete: ({ req: { user } }) => canEditPages(user),
  },
  hooks: {
    afterChange: [(args) => storeSlugRedirect({ ...args, collection: 'pages' })],
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
    },
    {
      name: 'content',
      type: 'textarea',
    },
    ...seoFieldList,
  ],
}
