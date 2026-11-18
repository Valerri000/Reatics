import React from 'react'

import { PhoneNumber } from '@/components/PhoneNumber'
import { availabilityStackClass, factStackClass } from '@/lib/factStack'
import { listingPhoneSize } from '@/lib/listingPhone'
import { listingHeadingClass } from '@/lib/listingType'
import { unavailableListing, type PublicBroker, type PublicListing } from '@/lib/listingPage'

export function ListingView({
  listing,
  report,
}: {
  listing: PublicListing
  report?: React.ReactNode
}) {
  if (listing.unavailable) {
    return (
      <article className="bg-sand px-inset-phone py-10 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto max-w-7xl">
          <h1 className={listingHeadingClass}>{listing.h1}</h1>
          {listing.address ? <p className="m-0 mt-3 text-base text-slate">{listing.address}</p> : null}
          <p className="m-0 mt-6 text-xl font-bold text-ink">{unavailableListing}</p>
        </div>
      </article>
    )
  }

  return (
    <article className="bg-sand px-inset-phone py-10 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.6fr_0.8fr]">
        <div className="lg:col-span-2">
          <p className="m-0 text-[10px] font-black uppercase tracking-widest text-brand">{listing.transaction}</p>
          <h1 className={`mt-3 ${listingHeadingClass}`}>{listing.h1}</h1>
          {listing.address ? <p className="m-0 mt-3 text-base font-bold text-slate">{listing.address}</p> : null}
          <p className="m-0 mt-4 text-3xl font-black text-brand">{listing.price}</p>
        </div>
        <div className="space-y-8">
          <div>
            <img src={listing.photo} alt={listing.photoAlt} className="aspect-video w-full rounded-3xl object-cover" />
            <div className="mt-4 grid grid-cols-4 gap-3">
              {listing.thumbs.map((thumb) => (
                <img key={thumb} src={thumb} alt="" className="aspect-video w-full rounded-2xl object-cover" />
              ))}
            </div>
          </div>
          {listing.facts.length > 0 ? (
            <dl className={`${factStackClass} rounded-[2rem] border border-line bg-white p-4 md:p-8`}>
              {listing.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="m-0 text-[10px] font-black uppercase tracking-widest text-gray">{fact.label}</dt>
                  <dd className="m-0 mt-2 text-base font-bold text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          <section className="rounded-[2rem] border border-line bg-white p-8">
            <h2 className="m-0 text-2xl font-black text-ink">Availabilities</h2>
            <div className="mt-6 grid gap-4">
              {listing.availabilities.map((row) => (
                <div
                  key={[row.suite, row.floor, row.use].join('-')}
                  className={availabilityStackClass}
                >
                  <Fact label="Status" value={row.status} />
                  <Fact label="Floor" value={row.floor} />
                  <Fact label="Suite" value={row.suite} />
                  <Fact label="Square feet" value={row.squareFeet} />
                  <Fact label="Use" value={row.use} />
                  <Fact label="Term" value={row.term} />
                  <Fact label="Price" value={row.price} />
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-[2rem] border border-line bg-white p-8">
            <h2 className="m-0 text-2xl font-black text-ink">Description</h2>
            <p className="m-0 mt-4 text-base leading-7 text-slate">{listing.description}</p>
          </section>
        </div>
        <aside className="space-y-6 lg:sticky lg:top-24">
          {listing.coworking ? (
            <div className="rounded-[2rem] bg-ink p-8 text-white">
              <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Coworking</p>
              <div className="mt-4">
                <PhoneNumber tone="white" size={listingPhoneSize} />
              </div>
            </div>
          ) : (
            <BrokerCard broker={listing.broker} />
          )}
          {report ? <div className="rounded-[2rem] border border-line bg-white p-8">{report}</div> : null}
        </aside>
      </div>
    </article>
  )
}

function BrokerCard({ broker }: { broker: PublicBroker | null }) {
  if (!broker) return null
  return (
    <div className="rounded-[2rem] bg-ink p-8 text-white">
      <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Broker</p>
      {broker.name ? <p className="m-0 mt-4 text-xl font-black">{broker.name}</p> : null}
      {broker.company ? <p className="m-0 mt-1 text-sm text-white/70">{broker.company}</p> : null}
      {broker.phone ? (
        <a className="mt-4 inline-block text-[20px] font-bold" href={'tel:' + broker.phone.replace(/\D/g, '')}>
          <span className="text-white">{broker.phone}</span>
        </a>
      ) : null}
      {broker.email ? (
        <a className="mt-2 block text-sm" href={'mailto:' + broker.email}>
          <span className="text-white">{broker.email}</span>
        </a>
      ) : null}
    </div>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <p className="m-0">
      <span className="block text-[10px] font-black uppercase tracking-widest text-gray">{label}</span>
      <span className="mt-1 block text-sm font-bold text-ink">{value}</span>
    </p>
  )
}
