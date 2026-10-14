import { notFound } from 'next/navigation'
import React from 'react'

import { pageTitles } from '@/lib/navigation'

export default async function MarketingPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const title = slug.length === 1 ? pageTitles[slug[0]] : undefined
  if (!title) notFound()

  return (
    <section className="px-inset-phone py-section-phone md:px-inset-wide md:py-section">
      <h1 className="text-[28px] font-extrabold leading-none text-ink md:text-[32px]">{title}</h1>
    </section>
  )
}
