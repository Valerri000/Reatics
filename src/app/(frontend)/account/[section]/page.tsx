import { notFound } from 'next/navigation'
import React from 'react'

import { PageBanner } from '@/components/content/PageBanner'
import { accountTitles } from '@/lib/navigation'

export default async function AccountPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params
  const title = accountTitles[section]
  if (!title) notFound()

  return <PageBanner title={title} />
}
