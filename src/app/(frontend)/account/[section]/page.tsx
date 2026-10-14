import { notFound } from 'next/navigation'
import React from 'react'

import { accountTitles } from '@/lib/navigation'

export default async function AccountPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params
  const title = accountTitles[section]
  if (!title) notFound()

  return (
    <section className="px-inset-phone py-section-phone md:px-inset-wide md:py-section">
      <h1 className="text-[28px] font-extrabold leading-none text-ink md:text-[32px]">{title}</h1>
    </section>
  )
}
