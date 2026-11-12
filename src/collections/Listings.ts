import type { CollectionConfig } from 'payload'

import { seoFieldList } from '@/fields/seo'
import { recordDelete } from '@/lib/audit'
import { pointSavedWithListing } from '@/lib/listingCoordinates'
import { canModerate } from '@/lib/roles'
import { storeSlugRedirect } from '@/lib/slugRedirect'

export const Listings: CollectionConfig = {
  slug: 'listings',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'kind', 'city'],
  },
  access: {
    read: ({ req: { user } }) => canModerate(user),
    create: ({ req: { user } }) => canModerate(user),
    update: ({ req: { user } }) => canModerate(user),
    delete: ({ req: { user } }) => canModerate(user),
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        return pointSavedWithListing(data)
      },
    ],
    afterChange: [(args) => storeSlugRedirect({ ...args, collection: 'listings' })],
    afterDelete: [recordDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
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
      name: 'kind',
      type: 'select',
      required: true,
      options: [
        { label: 'For sale', value: 'sale' },
        { label: 'For lease', value: 'lease' },
        { label: 'Coworking', value: 'coworking' },
      ],
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'street',
      type: 'text',
    },
    {
      name: 'city',
      type: 'text',
    },
    {
      name: 'state',
      type: 'text',
    },
    {
      name: 'postalCode',
      type: 'text',
    },
    {
      name: 'propertyType',
      type: 'text',
      label: 'Property type',
    },
    {
      name: 'squareFootage',
      type: 'number',
      label: 'Square footage',
    },
    {
      name: 'keywords',
      type: 'text',
    },
    {
      name: 'county',
      type: 'text',
    },
    {
      name: 'latitude',
      type: 'number',
    },
    {
      name: 'longitude',
      type: 'number',
    },
    {
      name: 'lotSize',
      type: 'number',
      label: 'Lot size',
    },
    {
      name: 'capRate',
      type: 'number',
      label: 'Cap rate',
    },
    {
      name: 'yearBuilt',
      type: 'number',
      label: 'Year built',
    },
    {
      name: 'units',
      type: 'number',
      label: 'Units',
    },
    {
      name: 'listingCode',
      type: 'text',
      label: 'Listing ID',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'availability',
      type: 'select',
      defaultValue: 'available',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'No longer available', value: 'unavailable' },
      ],
    },
    {
      name: 'brokerName',
      type: 'text',
      label: 'Broker name',
    },
    {
      name: 'brokerCompany',
      type: 'text',
      label: 'Broker company',
    },
    {
      name: 'brokerPhone',
      type: 'text',
      label: 'Broker phone',
    },
    {
      name: 'brokerEmail',
      type: 'email',
      label: 'Broker email',
    },
    {
      name: 'availabilities',
      type: 'json',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    ...seoFieldList,
  ],
}
