import type { CollectionConfig } from 'payload'

import { seoFieldList } from '@/fields/seo'
import { recordDelete } from '@/lib/audit'
import { canEditMarketing } from '@/lib/roles'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Blog post',
    plural: 'Blog',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => canEditMarketing(user),
    update: ({ req: { user } }) => canEditMarketing(user),
    delete: ({ req: { user } }) => canEditMarketing(user),
  },
  hooks: {
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
      name: 'content',
      type: 'textarea',
    },
    ...seoFieldList,
  ],
}
