export const brokerBillingStates = ['active', 'past_due', 'canceled'] as const

export type BrokerBillingState = (typeof brokerBillingStates)[number]
