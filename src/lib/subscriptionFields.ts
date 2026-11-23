import type { Field } from 'payload'

export const subscriptionFieldList: Field[] = [
  {
    name: 'user',
    type: 'relationship',
    relationTo: 'users',
  },
  {
    name: 'planId',
    type: 'select',
    required: true,
    options: [
      { label: 'Broker', value: 'broker' },
      { label: 'Owner with listings', value: 'owner' },
    ],
  },
  {
    name: 'status',
    type: 'select',
    required: true,
    options: [
      { label: 'None', value: 'none' },
      { label: 'Incomplete', value: 'incomplete' },
      { label: 'Active', value: 'active' },
      { label: 'Past due', value: 'past_due' },
      { label: 'Canceled', value: 'canceled' },
    ],
  },
  {
    name: 'amountCents',
    type: 'number',
    required: true,
  },
  {
    name: 'stripeCustomerId',
    type: 'text',
  },
  {
    name: 'stripeSubscriptionId',
    type: 'text',
  },
  {
    name: 'stripeCheckoutSessionId',
    type: 'text',
  },
]
