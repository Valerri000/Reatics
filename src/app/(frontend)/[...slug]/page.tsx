import { notFound } from 'next/navigation'
import React from 'react'
import type { Metadata } from 'next'

import { ContactDetails } from '@/components/contact/ContactDetails'
import { PublicPageView } from '@/components/content/PublicPageView'
import { PlacePage } from '@/components/place/PlacePage'
import { loadPlaceListings, loadPublishedCity, loadPublishedPropertyType } from '@/lib/loadPlaces'
import { loadPublishedPage } from '@/lib/loadPublishedPage'
import { pageTitles } from '@/lib/navigation'
import { metadataFor } from '@/lib/pageMeta'
import { pageHeading } from '@/lib/pageResponse'
import { listingsForCity, listingsForType, reservedMapPath } from '@/lib/placeList'
import { isPublicPageSlug } from '@/lib/publicPages'
import { storyMeta } from '@/lib/storyMeta'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug } = await params
  if (slug.length !== 1) return {}
  const key = slug[0]
  if (isPublicPageSlug(key)) {
    const page = await loadPublishedPage(key)
    if (!page) return {}
    return metadataFor(page)
  }
  if (pageTitles[key]) return {}
  const city = await loadPublishedCity(key)
  if (city) return storyMeta({ ...city, path: `/${city.slug}` })
  const type = await loadPublishedPropertyType(key)
  if (type) return storyMeta({ ...type, path: `/${type.slug}` })
  return {}
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

  if (!pageTitles[key]) {
    const city = await loadPublishedCity(key)
    if (city) {
      const listings = listingsForCity(await loadPlaceListings(), city.title)
      return (
        <PlacePage
          h1={pageHeading(city)}
          content={city.content}
          listings={listings}
          mapHref={reservedMapPath('city', city.title)}
        />
      )
    }
    const type = await loadPublishedPropertyType(key)
    if (type) {
      const listings = listingsForType(await loadPlaceListings(), type.title)
      return (
        <PlacePage
          h1={pageHeading(type)}
          content={type.content}
          listings={listings}
          mapHref={reservedMapPath('property-type', type.title)}
        />
      )
    }
  }

  const title = pageTitles[key]
  if (!title) notFound()

  return (
    <section className="px-inset-phone py-section-phone md:px-inset-wide md:py-section">
      <h1 className="text-[28px] font-extrabold leading-none text-ink md:text-[32px]">{title}</h1>
    </section>
  )
}
