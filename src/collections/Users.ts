import { ValidationError, type CollectionBeforeChangeHook, type CollectionConfig } from 'payload'

import {
  LOCK_DURATION_MS,
  MAX_LOGIN_ATTEMPTS,
  MIN_PASSWORD_LENGTH,
  TOKEN_EXPIRATION_SECONDS,
} from '@/lib/session'

const guardAccount: CollectionBeforeChangeHook = ({ data, operation, req }) => {
  if (!data) return data

  if (operation === 'create' && !req.user) {
    data.verified = false
  }

  if (
    typeof data.password === 'string' &&
    data.password.length > 0 &&
    data.password.length < MIN_PASSWORD_LENGTH
  ) {
    throw new ValidationError({
      errors: [{ message: 'Use at least 8 characters.', path: 'password' }],
    })
  }

  return data
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'lastName', 'role', 'adminRole'],
  },
  auth: {
    tokenExpiration: TOKEN_EXPIRATION_SECONDS,
    maxLoginAttempts: MAX_LOGIN_ATTEMPTS,
    lockTime: LOCK_DURATION_MS,
    cookies: {
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    },
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    beforeChange: [guardAccount],
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'space-seeker',
      options: [
        { label: 'Space seeker', value: 'space-seeker' },
        { label: 'Broker', value: 'broker' },
        { label: 'Owner with listings', value: 'owner' },
        { label: 'Broker and owner', value: 'broker-owner' },
        { label: 'Coworking provider', value: 'coworking' },
      ],
    },
    {
      name: 'adminRole',
      type: 'select',
      label: 'Admin role',
      options: [
        { label: 'Owner', value: 'owner' },
        { label: 'Content manager', value: 'content-manager' },
        { label: 'Moderator', value: 'moderator' },
      ],
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'jobTitle',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'mobilePhone',
      type: 'text',
    },
    {
      name: 'officePhone',
      type: 'text',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'dreNumber',
      type: 'text',
      label: 'DRE number',
    },
    {
      name: 'listsProperties',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'referralAccepted',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'verified',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
