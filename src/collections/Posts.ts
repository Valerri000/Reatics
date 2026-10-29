import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

import { bodyField } from '@/fields/body'
import { seoFieldList } from '@/fields/seo'
import { recordDelete } from '@/lib/audit'
import { readPublishedMarketing } from '@/lib/draftAccess'
import { blockUnreadyPost, stampPublishDate, statusField } from '@/lib/publish'
import { canEditMarketing } from '@/lib/roles'
import { publicSlugField } from '@/lib/slugConflict'
import { storeSlugRedirect } from '@/lib/slugRedirect'

const stampPostDate: CollectionBeforeChangeHook = ({ data }) => stampPublishDate({ data })

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Blog post',
    plural: 'Blog',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'publishedOn'],
  },
  access: {
    read: readPublishedMarketing,
    create: ({ req: { user } }) => canEditMarketing(user),
    update: ({ req: { user } }) => canEditMarketing(user),
    delete: ({ req: { user } }) => canEditMarketing(user),
  },
  hooks: {
    beforeChange: [stampPostDate, blockUnreadyPost],
    afterChange: [(args) => storeSlugRedirect({ ...args, collection: 'posts' })],
    afterDelete: [recordDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    publicSlugField('posts'),
    statusField,
    {
      name: 'publishedOn',
      type: 'date',
      label: 'Publish date',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
    },
    bodyField('content'),
    ...seoFieldList,
  ],
}
