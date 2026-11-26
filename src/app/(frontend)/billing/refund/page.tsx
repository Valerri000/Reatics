import React from 'react'

import { RefundForm } from '@/components/billing/RefundForm'
import { RefundNotice } from '@/components/billing/RefundNotice'
import { PageBanner } from '@/components/content/PageBanner'

export const metadata = {
  title: 'Refund',
  robots: { index: false, follow: false },
}

export default async function RefundPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const query = await searchParams
  const state = query.state === 'recorded' || query.state === 'error' ? query.state : 'ready'
  return (
    <div className="flex flex-1 flex-col">
      <PageBanner title="Refund" />
      <RefundNotice state={state} />
      <RefundForm initial="" />
    </div>
  )
}
