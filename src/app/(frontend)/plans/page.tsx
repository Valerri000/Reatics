import React from 'react'

import { PlansScreen } from '@/components/billing/PlansScreen'
import { PageBanner } from '@/components/content/PageBanner'
import { currentAccount } from '@/lib/currentAccount'
import { planChoiceState } from '@/lib/planChoiceState'

export const metadata = {
  title: 'Plans',
  robots: { index: false, follow: false },
}

export default async function PlansPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const query = await searchParams
  const user = await currentAccount()
  const state = planChoiceState({
    signedIn: Boolean(user),
    error: query.state === 'error',
  })
  return (
    <div className="flex flex-1 flex-col">
      <PageBanner title="Plans" />
      <PlansScreen user={user} state={state} />
    </div>
  )
}
