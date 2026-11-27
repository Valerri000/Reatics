import type { Access, CollectionConfig } from 'payload'

import { recordDelete } from '@/lib/audit'

const ownRows: Access = ({ req: { user } }) => {
  if (!user) return false
  return { user: { equals: user.id } }
}

export const Favorites: CollectionConfig = {
  slug: 'favorites',
  labels: {
    singular: 'Favorite',
    plural: 'Favorites',
  },
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['listing', 'folder', 'user'],
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
      name: 'listing',
      type: 'relationship',
      relationTo: 'listings',
      required: true,
    },
    {
      name: 'folder',
      type: 'relationship',
      relationTo: 'favorite-folders',
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
  ],
}
