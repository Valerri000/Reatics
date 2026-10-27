import type { CollectionConfig } from 'payload'

import { bodyField } from '@/fields/body'
import { seoFieldList } from '@/fields/seo'
import { recordDelete } from '@/lib/audit'
import { readPublishedMarketing } from '@/lib/draftAccess'
import { blockUnreadyPublish, statusField } from '@/lib/publish'
import { canEditMarketing } from '@/lib/roles'
import { publicSlugField } from '@/lib/slugConflict'

export const Cities: CollectionConfig = {
  slug: 'cities',
  labels: {
    singular: 'City',
    plural: 'Cities',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status'],
  },
  access: {
    read: readPublishedMarketing,
    create: ({ req: { user } }) => canEditMarketing(user),
    update: ({ req: { user } }) => canEditMarketing(user),
    delete: ({ req: { user } }) => canEditMarketing(user),
  },
  hooks: {
    beforeChange: [blockUnreadyPublish('title', 'content')],
    afterDelete: [recordDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    publicSlugField('cities'),
    statusField,
    bodyField('content'),
    ...seoFieldList,
  ],
}
