export const monthlyAmountCents = 12900

export type PaidPlanId = 'broker' | 'owner'
export type FreePlanId = 'space-seeker' | 'coworking'
export type PlanId = PaidPlanId | FreePlanId

export type Plan = {
  id: PlanId
  name: string
  cents: number
  interval: 'month' | null
  paid: boolean
  checkout: boolean
}

export const plans: Plan[] = [
  {
    id: 'broker',
    name: 'Broker',
    cents: monthlyAmountCents,
    interval: 'month',
    paid: true,
    checkout: true,
  },
  {
    id: 'owner',
    name: 'Owner with listings',
    cents: monthlyAmountCents,
    interval: 'month',
    paid: true,
    checkout: true,
  },
  {
    id: 'space-seeker',
    name: 'Space seeker',
    cents: 0,
    interval: null,
    paid: false,
    checkout: false,
  },
  {
    id: 'coworking',
    name: 'Coworking provider',
    cents: 0,
    interval: null,
    paid: false,
    checkout: false,
  },
]

export function planById(id: string) {
  return plans.find((plan) => plan.id === id) ?? null
}

export function canCheckout(id: string) {
  return planById(id)?.checkout === true
}
