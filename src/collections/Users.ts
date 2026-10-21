import { ValidationError, type CollectionBeforeChangeHook, type CollectionConfig } from 'payload'

import { recordDelete, recordRoleChange, recordSignIn } from '@/lib/audit'
import { canModerate, isOwner, isStaff, ownRecord } from '@/lib/roles'
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

  if (!isOwner(req.user)) {
    if (operation === 'create') data.adminRole = null
    else delete data.adminRole
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
    admin: ({ req: { user } }) => isStaff(user),
    create: () => true,
    read: ({ req: { user } }) => {
      if (!user) return false
      if (canModerate(user)) return true
      return ownRecord(user)
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      if (canModerate(user)) return true
      return ownRecord(user)
    },
    delete: ({ req: { user } }) => canModerate(user),
  },
  hooks: {
    beforeChange: [guardAccount],
    afterChange: [recordRoleChange],
    afterLogin: [recordSignIn],
    afterDelete: [recordDelete],
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
      access: {
        update: ({ req: { user } }) => canModerate(user),
      },
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
      access: {
        create: ({ req: { user } }) => isOwner(user),
        update: ({ req: { user } }) => isOwner(user),
      },
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
      access: {
        update: ({ req: { user } }) => canModerate(user),
      },
    },
    {
      name: 'referralAccepted',
      type: 'checkbox',
      defaultValue: false,
      access: {
        update: ({ req: { user } }) => canModerate(user),
      },
    },
    {
      name: 'verified',
      type: 'checkbox',
      defaultValue: false,
      access: {
        create: ({ req: { user } }) => canModerate(user),
        update: ({ req: { user } }) => canModerate(user),
      },
    },
  ],
}
