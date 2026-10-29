import type { CollectionConfig } from 'payload'

import { bodyField } from '@/fields/body'
import { seoFieldList } from '@/fields/seo'
import { recordDelete } from '@/lib/audit'
import { readPublishedMarketing } from '@/lib/draftAccess'
import { blockUnreadyPublish, statusField } from '@/lib/publish'
import { canEditMarketing } from '@/lib/roles'
import { publicSlugField } from '@/lib/slugConflict'
import { storeSlugRedirect } from '@/lib/slugRedirect'

export const Glossary: CollectionConfig = {
  slug: 'glossary',
  labels: {
    singular: 'Glossary term',
    plural: 'Glossary',
  },
  admin: {
    useAsTitle: 'term',
    defaultColumns: ['term', 'slug', 'status'],
  },
  access: {
    read: readPublishedMarketing,
    create: ({ req: { user } }) => canEditMarketing(user),
    update: ({ req: { user } }) => canEditMarketing(user),
    delete: ({ req: { user } }) => canEditMarketing(user),
  },
  hooks: {
    beforeChange: [blockUnreadyPublish('term', 'definition')],
    afterChange: [(args) => storeSlugRedirect({ ...args, collection: 'glossary' })],
    afterDelete: [recordDelete],
  },
  fields: [
    {
      name: 'term',
      type: 'text',
      label: 'Term',
      required: true,
    },
    publicSlugField('glossary'),
    statusField,
    bodyField('definition', 'Definition'),
    ...seoFieldList,
  ],
}
