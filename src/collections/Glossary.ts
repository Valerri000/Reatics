import type { CollectionConfig } from 'payload'

import { seoFieldList } from '@/fields/seo'
import { recordDelete } from '@/lib/audit'
import { canEditMarketing } from '@/lib/roles'

export const Glossary: CollectionConfig = {
  slug: 'glossary',
  labels: {
    singular: 'Glossary term',
    plural: 'Glossary',
  },
  admin: {
    useAsTitle: 'term',
    defaultColumns: ['term', 'slug'],
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
      name: 'term',
      type: 'text',
      label: 'Term',
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
      name: 'definition',
      type: 'textarea',
      label: 'Definition',
    },
    ...seoFieldList,
  ],
}
