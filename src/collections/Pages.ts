import type { CollectionConfig } from 'payload'

import { canEditPages } from '@/lib/roles'

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
  ],
}
