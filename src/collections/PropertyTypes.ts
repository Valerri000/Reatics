import type { CollectionConfig } from 'payload'

import { bodyField } from '@/fields/body'
import { seoFieldList } from '@/fields/seo'
import { recordDelete } from '@/lib/audit'
import { readPublishedMarketing } from '@/lib/draftAccess'
import { blockUnreadyPublish, statusField } from '@/lib/publish'
import { canEditMarketing } from '@/lib/roles'
import { publicSlugField } from '@/lib/slugConflict'
import { storeSlugRedirect } from '@/lib/slugRedirect'

export const PropertyTypes: CollectionConfig = {
  slug: 'property-types',
  labels: {
    singular: 'Property type',
    plural: 'Property types',
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
    afterChange: [(args) => storeSlugRedirect({ ...args, collection: 'property-types' })],
    afterDelete: [recordDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    publicSlugField('property-types'),
    statusField,
    bodyField('content'),
    ...seoFieldList,
  ],
}
