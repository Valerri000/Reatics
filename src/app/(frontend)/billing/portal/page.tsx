import React from 'react'

import { PageBanner } from '@/components/content/PageBanner'
import { PortalReturn } from '@/components/billing/PortalReturn'

export const metadata = {
  title: 'Customer portal',
  robots: { index: false, follow: false },
}

export default async function PortalPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const query = await searchParams
  const result = typeof query.result === 'string' ? query.result : 'return'
  return (
    <div className="flex flex-1 flex-col">
      <PageBanner title="Customer portal" />
      <PortalReturn state={result === 'error' ? 'error' : 'return'} />
    </div>
  )
}
