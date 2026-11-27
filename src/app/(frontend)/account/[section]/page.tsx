import { notFound } from 'next/navigation'
import React from 'react'

import { SavedBrokers } from '@/components/account/SavedBrokers'
import { BillingStates } from '@/components/billing/BillingStates'
import { PortalButton } from '@/components/billing/PortalButton'
import { PageBanner } from '@/components/content/PageBanner'
import { currentAccount } from '@/lib/currentAccount'
import { accountTitles } from '@/lib/navigation'

export default async function AccountPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params
  const title = accountTitles[section]
  if (!title) notFound()
  const account = section === 'billing' ? await currentAccount() : null

  return (
    <div className="flex flex-1 flex-col">
      <PageBanner title={title} />
      {section === 'saved-brokers' ? <SavedBrokers /> : null}
      {section === 'billing' ? (
        <>
          <BillingStates status={account?.subscriptionStatus ?? null} />
          <PortalButton />
        </>
      ) : null}
    </div>
  )
}
