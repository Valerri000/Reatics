import { notFound } from 'next/navigation'
import React from 'react'
import type { Metadata } from 'next'

import { BrokerDirectory } from '@/components/broker/BrokerDirectory'
import { ContactDetails } from '@/components/contact/ContactDetails'
import { AboutPage } from '@/components/content/AboutPage'
import { PublicPageView } from '@/components/content/PublicPageView'
import { CommercialMarket } from '@/components/market/CommercialMarket'
import { CoworkingMarket } from '@/components/market/CoworkingMarket'
import { FeaturedMarket } from '@/components/market/FeaturedMarket'
import { PlacePage } from '@/components/place/PlacePage'
import { loadPlaceListings, loadPublishedCity, loadPublishedPropertyType } from '@/lib/loadPlaces'
import { loadPageBySlug, loadPublishedPage } from '@/lib/loadPublishedPage'
import { marketListings, readQuery } from '@/lib/marketListings'
import { pageTitles } from '@/lib/navigation'
import { metadataFor } from '@/lib/pageMeta'
import { pageHeading } from '@/lib/pageResponse'
import { publicPageSeeds } from '@/lib/publicPageSeed'
import { listingsForCity, listingsForType, reservedMapPath } from '@/lib/placeList'
import { isLegalPageSlug } from '@/lib/legalPages'
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
  if (key === 'home') return {}
  if (isPublicPageSlug(key) || isLegalPageSlug(key)) {
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

export default async function MarketingPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { slug } = await params
  const query = readQuery(await searchParams)
  if (slug.length !== 1) notFound()
  const key = slug[0]
  if (key === 'home') notFound()
  if (key === 'about') {
    const record = await loadPageBySlug(key)
    if (record && record.status !== 'published') notFound()
    const seed = publicPageSeeds.find((item) => item.slug === 'about')
    const page = record?.status === 'published' ? record : null
    return <AboutPage h1={page ? pageHeading(page) : seed?.h1 || 'About Us'} content={page?.content ?? seed?.content} />
  }
  if (isPublicPageSlug(key) || isLegalPageSlug(key)) {
    const record = await loadPageBySlug(key)
    if (record && record.status !== 'published') notFound()
    const page = record?.status === 'published' ? record : null
    const seed = publicPageSeeds.find((item) => item.slug === key)
    if (!page && !seed) notFound()
    return (
      <PublicPageView
        h1={page ? pageHeading(page) : seed?.h1 || pageTitles[key]}
        content={page?.content ?? seed?.content}
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
  if (key === 'brokers') return <BrokerDirectory />
  if (key === 'featured' || key === 'coworking' || key === 'commercial') {
    const listings = await loadPlaceListings()
    if (key === 'featured') {
      return <FeaturedMarket listings={marketListings(listings, query)} activeKind={query.kind} place={query.place} />
    }
    if (key === 'coworking') {
      return <CoworkingMarket listings={marketListings(listings, { kind: 'coworking' })} />
    }
    return <CommercialMarket listings={marketListings(listings, { kind: 'commercial' })} />
  }

  return (
    <section className="px-inset-phone py-section-phone md:px-inset-wide md:py-section">
      <h1 className="text-[28px] font-extrabold leading-none text-ink md:text-[32px]">{title}</h1>
    </section>
  )
}
