import type { CollectionConfig } from 'payload'

import { accountBillingStatuses } from '@/lib/accountBilling'
import { recordDelete, recordRoleChange, recordSignIn } from '@/lib/audit'
import { canModerate, isOwner, isStaff, ownRecord } from '@/lib/roles'
import { signupGuard } from '@/lib/signupGuard'
import {
  LOCK_DURATION_MS,
  MAX_LOGIN_ATTEMPTS,
  TOKEN_EXPIRATION_SECONDS,
} from '@/lib/session'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'lastName', 'role', 'adminRole', 'dreValidated', 'verified', 'subscriptionStatus'],
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
    beforeChange: [signupGuard],
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
      name: 'dreValidated',
      type: 'checkbox',
      label: 'DRE validated',
      defaultValue: false,
      access: {
        create: ({ req: { user } }) => isOwner(user),
        update: ({ req: { user } }) => isOwner(user),
      },
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
        create: ({ req: { user } }) => isOwner(user),
        update: ({ req: { user } }) => isOwner(user),
      },
    },
    {
      name: 'subscriptionStatus',
      type: 'select',
      label: 'Subscription status',
      options: accountBillingStatuses.map((value) => ({
        label: value === 'past_due' ? 'Past due' : value === 'canceled' ? 'Canceled' : value === 'comped' ? 'Comped' : 'Active',
        value,
      })),
      access: {
        create: ({ req: { user } }) => isOwner(user),
        update: ({ req: { user } }) => isOwner(user),
      },
    },
  ],
}
