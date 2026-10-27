import type { CollectionConfig } from 'payload'

import { bodyField } from '@/fields/body'
import { seoFieldList } from '@/fields/seo'
import { recordDelete } from '@/lib/audit'
import { readPublishedPages } from '@/lib/draftAccess'
import { blockUnreadyPublish, statusField } from '@/lib/publish'
import { canEditPages } from '@/lib/roles'
import { publicSlugField } from '@/lib/slugConflict'
import { storeSlugRedirect } from '@/lib/slugRedirect'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status'],
  },
  access: {
    read: readPublishedPages,
    create: ({ req: { user } }) => canEditPages(user),
    update: ({ req: { user } }) => canEditPages(user),
    delete: ({ req: { user } }) => canEditPages(user),
  },
  hooks: {
    beforeChange: [blockUnreadyPublish('title', 'content')],
    afterChange: [(args) => storeSlugRedirect({ ...args, collection: 'pages' })],
    afterDelete: [recordDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    publicSlugField('pages'),
    statusField,
    bodyField('content'),
    ...seoFieldList,
  ],
}
