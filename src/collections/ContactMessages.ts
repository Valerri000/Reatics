import type { CollectionConfig } from 'payload'

import { recordDelete } from '@/lib/audit'
import { canEditPages } from '@/lib/roles'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  labels: {
    singular: 'Contact message',
    plural: 'Contact messages',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'createdAt'],
  },
  access: {
    admin: ({ req: { user } }) => canEditPages(user),
    read: ({ req: { user } }) => canEditPages(user),
    create: () => true,
    update: () => false,
    delete: ({ req: { user } }) => canEditPages(user),
  },
  hooks: {
    afterDelete: [recordDelete],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
  ],
}
