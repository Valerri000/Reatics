import React from 'react'

import { CheckoutReturn } from '@/components/billing/CheckoutReturn'
import { PageBanner } from '@/components/content/PageBanner'
import { readCheckoutReturn } from '@/lib/readCheckoutReturn'

export const metadata = {
  title: 'Checkout',
  robots: { index: false, follow: false },
}

export default async function CheckoutReturnPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const query = await searchParams
  const result = await readCheckoutReturn({
    result: typeof query.result === 'string' ? query.result : '',
    sessionId: typeof query.session_id === 'string' ? query.session_id : '',
  })
  const title = result.state === 'success' ? 'Payment recorded' : 'Payment not completed'
  return (
    <div className="flex flex-1 flex-col">
      <PageBanner title={title} />
      <CheckoutReturn state={result.state} />
    </div>
  )
}
