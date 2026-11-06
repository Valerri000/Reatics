'use client'

import Link from 'next/link'
import React from 'react'

import { useAuth } from '@/components/auth/AuthProvider'
import { HomeSection } from '@/components/home/HomeSection'
import { HeartIcon } from '@/components/icons'
import { designPhoto, propertyPhotos } from '@/lib/homeImages'
import { featuredCardClass } from '@/lib/homeListings'
import { formatListingPrice, type ListingKind } from '@/lib/listingPrice'
import { listingCardFields } from '@/lib/placeList'

type FeaturedCard = ReturnType<typeof listingCardFields>

const designProperties = [
  {
    imageUrl: propertyPhotos[0],
    kind: 'lease' as const,
    badge: 'Office',
    price: '$45.00 / SF',
    street: '201 N Brand Blvd',
    cityLine: 'Glendale, CA 91203',
    category: 'Office space',
    action: 'contact' as const,
  },
  {
    imageUrl: propertyPhotos[1],
    kind: 'coworking' as const,
    badge: 'Desk',
    price: '$350 / Mo',
    street: '123 Market St',
    cityLine: 'San Francisco, CA 94103',
    category: 'Shared office',
    action: 'call' as const,
  },
  {
    imageUrl: propertyPhotos[2],
    kind: 'sale' as const,
    badge: 'Retail',
    price: '$1,250,000',
    street: '800 Wilshire Blvd',
    cityLine: 'Los Angeles, CA 90017',
    category: 'Retail building',
    action: 'contact' as const,
  },
  {
    imageUrl: propertyPhotos[3],
    kind: 'lease' as const,
    badge: 'Industrial',
    price: '$12.50 / SF',
    street: '450 Terminal Way',
    cityLine: 'Pasadena, CA 91101',
    category: 'Warehouse',
    action: 'contact' as const,
  },
  {
    imageUrl: propertyPhotos[4],
    kind: 'coworking' as const,
    badge: 'Private office',
    price: '$1,200 / Mo',
    street: '555 Flower St',
    cityLine: 'Los Angeles, CA 90071',
    category: 'Premium office',
    action: 'call' as const,
  },
  {
    imageUrl: propertyPhotos[5],
    kind: 'lease' as const,
    badge: 'Medical',
    price: '$55.00 / SF',
    street: '101 Medical Plaza',
    cityLine: 'Santa Monica, CA 90404',
    category: 'Medical suite',
    action: 'contact' as const,
  },
]

const kindLabel: Record<ListingKind, string> = {
  sale: 'For sale',
  lease: 'For lease',
  coworking: 'Coworking',
}

const kindBadge: Record<ListingKind, string> = {
  lease: 'bg-brand',
  coworking: 'bg-[#16a34a]',
  sale: 'bg-ink',
}

export function FeaturedListings({ listings }: { listings: FeaturedCard[] }) {
  const auth = useAuth()

  return (
    <HomeSection id="featured" tone="mist">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="m-0 text-3xl font-bold text-ink">Featured commercial properties</h2>
            <p className="m-0 mt-2 text-slate">Hand-picked listings for top-tier office and retail space.</p>
          </div>
          <Link href="/featured" className="shrink-0 text-sm font-semibold">
            <span className="text-brand">View all listings →</span>
          </Link>
        </div>
        {listings.length === 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {designProperties.map((property) => (
              <PropertyCard
                key={property.street}
                imageUrl={property.imageUrl}
                imageAlt={property.street}
                kind={property.kind}
                badge={property.badge}
                price={property.price}
                street={property.street}
                cityLine={property.cityLine}
                category={property.category}
                action={property.action}
                href="/featured"
                onSave={auth.openSignIn}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {listings.map((listing, index) => (
              <div key={listing.href} className={featuredCardClass(index)}>
                <PropertyCard
                  imageUrl={designPhoto(listing.imageUrl, propertyPhotos, index)}
                  imageAlt={listing.imageAlt}
                  kind={listing.kind}
                  badge={listing.propertyType}
                  price={formatListingPrice(listing.kind, listing.price)}
                  street={listing.street}
                  cityLine={listing.cityLine}
                  category={listing.propertyType || listing.title}
                  action={listing.kind === 'coworking' ? 'call' : 'contact'}
                  href={listing.href}
                  onSave={auth.user ? undefined : auth.openSignIn}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </HomeSection>
  )
}

function PropertyCard({
  imageUrl,
  imageAlt,
  kind,
  badge,
  price,
  street,
  cityLine,
  category,
  action,
  href,
  onSave,
}: {
  imageUrl: string
  imageAlt: string
  kind: ListingKind
  badge: string
  price: string
  street: string
  cityLine: string
  category: string
  action: 'contact' | 'call'
  href: string
  onSave?: () => void
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
      <div className="relative h-48">
        <Link href={href} className="absolute inset-0">
          <img src={imageUrl} alt={imageAlt} className="cover-photo" />
        </Link>
        <span className="absolute left-3 top-3 z-10 flex gap-2">
          <span className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white ${kindBadge[kind]}`}>
            {kindLabel[kind]}
          </span>
          {badge ? (
            <span className="rounded bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-ink shadow-sm">
              {badge}
            </span>
          ) : null}
        </span>
        <button
          type="button"
          aria-label="Save listing"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand shadow-sm"
          onClick={onSave}
        >
          <HeartIcon />
        </button>
      </div>
      <div className="px-4 pb-4 pt-4">
        <Link href={href} className="block no-underline">
          <span className="block text-xl font-bold text-ink">{price}</span>
          {street ? <span className="mt-1 block text-sm text-ink">{street}</span> : null}
          {cityLine ? <span className="block text-sm text-gray">{cityLine}</span> : null}
        </Link>
      </div>
      <div className="flex items-center justify-between border-t border-line px-4 py-3">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-slate">{category}</span>
        {action === 'call' ? (
          <a href="tel:18885189168" className="text-sm font-semibold">
            <span className="text-accent">Call Now</span>
          </a>
        ) : (
          <Link href="/contact" className="text-sm font-semibold">
            <span className="text-accent">Contact Agent</span>
          </Link>
        )}
      </div>
    </article>
  )
}
