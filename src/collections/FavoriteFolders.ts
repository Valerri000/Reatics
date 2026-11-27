import type { Access, CollectionConfig } from 'payload'

import { recordDelete } from '@/lib/audit'

const ownRows: Access = ({ req: { user } }) => {
  if (!user) return false
  return { user: { equals: user.id } }
}

export const FavoriteFolders: CollectionConfig = {
  slug: 'favorite-folders',
  labels: {
    singular: 'Favorite folder',
    plural: 'Favorite folders',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'user'],
  },
  access: {
    read: ownRows,
    create: ({ req: { user } }) => Boolean(user),
    update: ownRows,
    delete: ownRows,
  },
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        if (!req.user) return data
        return { ...data, user: req.user.id }
      },
    ],
    afterDelete: [recordDelete],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
  ],
}
