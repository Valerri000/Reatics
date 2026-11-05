import Link from 'next/link'
import React from 'react'

import { MarketQueryForm } from '@/components/market/MarketQueryForm'
import { MarketLink, ResultGrid } from '@/components/market/ResultGrid'
import { listingMainPhoto } from '@/lib/pageImages'
import { commercialMarkets } from '@/lib/pageImages'
import type { PlaceListing } from '@/lib/placeList'

export function CommercialMarket({ listings }: { listings: PlaceListing[] }) {
  return (
    <div className="bg-white">
      <section className="px-inset-phone py-16 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="m-0 inline-flex rounded-full bg-sand px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand">
              Sale and lease
            </p>
            <h1 className="m-0 mt-6 text-5xl font-black leading-none tracking-tight text-ink md:text-7xl">
              Invest and expand.
            </h1>
            <p className="m-0 mt-6 max-w-xl text-xl font-medium leading-relaxed text-slate">
              Search office, retail, and industrial space for sale or lease. Coworking stays on its own page.
            </p>
            <div className="mt-8">
              <MarketQueryForm mode="commercial" />
            </div>
          </div>
          <img src={listingMainPhoto} alt="" className="h-[420px] w-full rounded-[2rem] object-cover" />
        </div>
      </section>
      <section className="border-y border-line px-inset-phone py-12 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {commercialMarkets.map((card) => (
            <MarketLink
              key={card.name}
              href={`/featured?place=${encodeURIComponent(card.place)}&kind=commercial&use=all`}
              image={card.image}
              name={card.name}
            />
          ))}
        </div>
      </section>
      <section className="px-inset-phone py-16 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto max-w-7xl">
          <h2 className="m-0 text-4xl font-black tracking-tight text-ink">Latest market assets</h2>
          <ResultGrid listings={listings} />
          <Link href="/map?kind=commercial" className="mt-12 inline-flex rounded-full bg-ink px-8 py-4 text-sm font-black no-underline">
            <span className="text-white">Open Commercial Map</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
