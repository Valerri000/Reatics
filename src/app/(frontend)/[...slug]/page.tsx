import { notFound } from 'next/navigation'
import React from 'react'
import type { Metadata } from 'next'

import { ContactDetails } from '@/components/contact/ContactDetails'
import { PublicPageView } from '@/components/content/PublicPageView'
import { loadPublishedPage } from '@/lib/loadPublishedPage'
import { pageTitles } from '@/lib/navigation'
import { metadataFor } from '@/lib/pageMeta'
import { pageHeading } from '@/lib/pageResponse'
import { isPublicPageSlug } from '@/lib/publicPages'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug } = await params
  if (slug.length !== 1 || !isPublicPageSlug(slug[0])) return {}
  const page = await loadPublishedPage(slug[0])
  if (!page) return {}
  return metadataFor(page)
}

export default async function MarketingPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  if (slug.length !== 1) notFound()
  const key = slug[0]
  if (isPublicPageSlug(key)) {
    const page = await loadPublishedPage(key)
    if (!page) notFound()
    return (
      <PublicPageView
        h1={pageHeading(page)}
        content={page.content}
        contact={key === 'contact' ? <ContactDetails /> : null}
      />
    )
  }

  const title = pageTitles[key]
  if (!title) notFound()

  return (
    <section className="px-inset-phone py-section-phone md:px-inset-wide md:py-section">
      <h1 className="text-[28px] font-extrabold leading-none text-ink md:text-[32px]">{title}</h1>
    </section>
  )
}
