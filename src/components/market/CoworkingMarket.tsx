import Link from 'next/link'
import React from 'react'

import { MarketQueryForm } from '@/components/market/MarketQueryForm'
import { MarketLink, ResultGrid } from '@/components/market/ResultGrid'
import { coworkHeroPhoto, marketCards } from '@/lib/pageImages'
import type { PlaceListing } from '@/lib/placeList'

export function CoworkingMarket({ listings }: { listings: PlaceListing[] }) {
  return (
    <div className="bg-white">
      <section className="px-inset-phone py-16 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="m-0 inline-flex rounded-full bg-emerald-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">
              Agile Workspace Solutions
            </p>
            <h1 className="m-0 mt-6 text-5xl font-black leading-none tracking-tight text-ink md:text-7xl">
              Work Everywhere.
            </h1>
            <p className="m-0 mt-6 max-w-xl text-xl font-medium leading-relaxed text-slate">
              Find a coworking desk or office by place and team size. Results stay on the featured list.
            </p>
            <div className="mt-8">
              <MarketQueryForm mode="coworking" />
            </div>
          </div>
          <img src={coworkHeroPhoto} alt="" className="h-[420px] w-full rounded-[2rem] object-cover" />
        </div>
      </section>
      <section className="border-y border-line bg-white px-inset-phone py-12 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto max-w-7xl">
          <h2 className="m-0 text-[10px] font-black uppercase tracking-[0.4em] text-gray">Trending Markets</h2>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {marketCards.map((card) => (
              <MarketLink
                key={card.name}
                href={`/featured?place=${encodeURIComponent(card.place)}&kind=coworking&use=all`}
                image={card.image}
                name={card.name}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="px-inset-phone py-16 md:px-inset-tablet xl:px-inset-desktop 2xl:px-inset-wide">
        <div className="mx-auto max-w-7xl">
          <h2 className="m-0 text-4xl font-black tracking-tight text-ink">Coworking hubs</h2>
          <ResultGrid listings={listings} />
          <Link href="/account/listings" className="mt-12 inline-flex rounded-full bg-ink px-8 py-4 text-sm font-black no-underline">
            <span className="text-white">List a space</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
