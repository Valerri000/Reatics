import Link from 'next/link'
import React from 'react'

import { PhoneNumber } from '@/components/PhoneNumber'
import { formatListingPrice } from '@/lib/listingPrice'
import { floorPhoto, listingMainPhoto, listingThumbs } from '@/lib/pageImages'
import { listingCityLine, type PlaceListing } from '@/lib/placeList'

const kindLabel = {
  sale: 'For Sale',
  lease: 'For Lease',
  coworking: 'Coworking',
}

export function ListingView({ listing }: { listing: PlaceListing }) {
  const photo = listing.imageUrl || listingMainPhoto
  const cityLine = listingCityLine(listing)
  const address = listing.street || listing.title
  const details = [
    kindLabel[listing.kind],
    listing.propertyType,
    listing.price != null ? formatListingPrice(listing.kind, listing.price) : '',
  ].filter(Boolean)

  return (
    <article className="bg-sand px-inset-phone py-10 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 text-xs font-bold uppercase tracking-widest text-gray">
          <p className="m-0">
            <Link href="/" className="no-underline">
              <span className="text-gray">Home</span>
            </Link>
            <span className="px-2">/</span>
            <span className="text-ink">{address}</span>
          </p>
        </div>
        <div className="grid items-start gap-10 lg:grid-cols-[1.6fr_0.8fr]">
          <div className="space-y-8">
            <div>
              <img src={photo} alt={listing.imageAlt || listing.title} className="aspect-video w-full rounded-3xl object-cover" />
              <div className="mt-4 grid grid-cols-4 gap-3">
                {listingThumbs.map((thumb) => (
                  <img key={thumb} src={thumb} alt="" className="aspect-video w-full rounded-2xl object-cover" />
                ))}
              </div>
            </div>
            <section id="availabilities" className="rounded-[2rem] border border-line bg-white p-8">
              <h2 className="m-0 text-2xl font-black text-ink">Available spaces</h2>
              <p className="m-0 mt-4 text-base text-slate">{details.join(' / ')}</p>
            </section>
            <section className="rounded-[2rem] border border-line bg-white p-8">
              <h2 className="m-0 text-2xl font-black text-ink">Property overview</h2>
              <p className="m-0 mt-4 text-base leading-7 text-slate">
                {`${address}${cityLine ? `, ${cityLine}` : ''}. ${kindLabel[listing.kind]}${listing.propertyType ? ` ${listing.propertyType.toLowerCase()}` : ''} listing on Reatics.`}
              </p>
            </section>
            <section className="rounded-[2rem] border border-line bg-white p-8">
              <h2 className="m-0 text-2xl font-black text-ink">Floor plan</h2>
              <img src={floorPhoto} alt="" className="mt-6 aspect-video w-full rounded-3xl bg-sand object-contain" />
            </section>
          </div>
          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="rounded-[2rem] border border-line bg-white p-8">
              <h1 className="m-0 text-3xl font-black leading-tight text-ink">{address}</h1>
              {cityLine ? <p className="m-0 mt-2 font-bold text-slate">{cityLine}</p> : null}
              <p className="m-0 mt-6 text-3xl font-black text-brand">
                {formatListingPrice(listing.kind, listing.price ?? null)}
              </p>
              <p className="m-0 mt-2 text-[10px] font-black uppercase tracking-widest text-gray">{kindLabel[listing.kind]}</p>
            </div>
            <div className="rounded-[2rem] bg-ink p-8 text-white">
              <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
                {listing.kind === 'coworking' ? 'Coworking desk' : 'Listing contact'}
              </p>
              <div className="mt-4">
                <PhoneNumber tone="white" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}
