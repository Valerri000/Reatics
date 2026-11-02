import type { CollectionConfig } from 'payload'

import { recordDelete } from '@/lib/audit'
import { canAddRedirect } from '@/lib/redirectAccess'
import { isStaff } from '@/lib/roles'

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: {
    useAsTitle: 'fromPath',
    defaultColumns: ['fromPath', 'toPath', 'statusCode'],
  },
  access: {
    read: ({ req: { user } }) => isStaff(user),
    create: ({ req: { user } }) => canAddRedirect(user),
    update: ({ req: { user } }) => canAddRedirect(user),
    delete: ({ req: { user } }) => canAddRedirect(user),
  },
  hooks: {
    afterDelete: [recordDelete],
  },
  fields: [
    {
      name: 'fromPath',
      type: 'text',
      label: 'From path',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'toPath',
      type: 'text',
      label: 'To path',
      required: true,
    },
    {
      name: 'statusCode',
      type: 'number',
      label: 'Status code',
      required: true,
      defaultValue: 301,
    },
  ],
}
