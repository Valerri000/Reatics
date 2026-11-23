'use client'

import React from 'react'

import { PlanChoice } from '@/components/billing/PlanChoice'
import { useAuth } from '@/components/auth/AuthProvider'
import type { AccountUser } from '@/lib/account'
import type { PlanChoiceState } from '@/lib/planChoiceState'
import { startPlanCheckout } from '@/lib/startPlanCheckout'

export function PlansScreen({ user, state }: { user: AccountUser | null; state: PlanChoiceState }) {
  const auth = useAuth()
  return (
    <PlanChoice
      user={user}
      state={state}
      onSignIn={() => auth.openSignIn()}
      onPay={(planId) => startPlanCheckout(planId)}
    />
  )
}
