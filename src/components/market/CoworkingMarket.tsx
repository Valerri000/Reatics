import Link from 'next/link'

import { CoworkingHubs } from '@/components/market/CoworkingHubs'
import { CoworkingSignup } from '@/components/market/CoworkingSignup'
import { MarketQueryForm } from '@/components/market/MarketQueryForm'
import { coworkHeroPhoto, marketCards } from '@/lib/pageImages'
import type { PlaceListing } from '@/lib/placeList'

export function CoworkingMarket({ listings }: { listings: PlaceListing[] }) {
  return (
    <div className="mesh-bg text-slate-900">
      <section className="pb-20 pt-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-4 sm:px-6 lg:flex-row lg:px-8">
          <div className="lg:w-3/5">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full bg-blue-100 px-4 py-2">
              <svg className="h-3 w-3 text-brand" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13 2L4 14h7l-1 8 10-14h-7l0-6z" fill="currentColor" />
              </svg>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand">Agile Workspace Solutions</span>
            </div>
            <h1 className="mb-8 text-6xl font-black leading-[0.9] tracking-tighter text-slate-900 md:text-8xl">
              Work <br /> <span className="gradient-text">Everywhere</span>.
            </h1>
            <p className="mb-12 max-w-xl text-xl font-medium leading-relaxed text-slate-500 md:text-2xl">
              Reatics Coworking connects you to the world&apos;s most dynamic shared offices. From solo desks to enterprise suites, find your next hub in seconds.
            </p>
            <MarketQueryForm mode="coworking" />
          </div>
          <div className="relative w-full lg:w-2/5">
            <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-brand/10 blur-[80px]" />
            <div className="relative z-10 h-[500px] rotate-2 overflow-hidden rounded-[3rem] border-4 border-white shadow-2xl">
              <img src={coworkHeroPhoto} alt="" className="cowork-photo" />
            </div>
          </div>
        </div>
      </section>
      <section className="border-y border-blue-50 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="m-0 text-[10px] font-black uppercase tracking-[0.5em] text-blue-300">Trending Markets</h2>
            <div className="mx-8 h-px flex-1 bg-blue-50" />
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {marketCards.map((card, index) => (
              <Link
                key={card.name}
                href={`/featured?place=${encodeURIComponent(card.place)}&kind=coworking&use=all`}
                className={`group block no-underline ${index % 2 === 1 ? 'md:mt-8' : ''}`}
              >
                <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl transition duration-500 group-hover:shadow-brand/20">
                  <img src={card.image} alt="" className="cowork-photo transition duration-700 group-hover:scale-110" />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                  <span className="absolute bottom-6 left-6 text-white">
                    <span className="block text-xl font-black">{card.name}</span>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-white/70">
                      {spaceLabel(listings, card.place)}
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-20 flex flex-col items-end justify-between gap-8 md:flex-row">
            <div>
              <h2 className="mb-4 text-5xl font-black tracking-tighter text-slate-900">
                Elite <span className="text-brand underline decoration-blue-100 decoration-8 underline-offset-8">Coworking</span> Hubs.
              </h2>
              <p className="m-0 text-lg font-bold text-slate-400">The latest flexible workspace availability updated 15 minutes ago.</p>
            </div>
            <a href="#cowork-search" className="rounded-full bg-brand px-10 py-5 no-underline shadow-2xl shadow-brand/20 hover:bg-brand-deep">
              <span className="text-xs font-black uppercase tracking-widest text-white">Refine Search</span>
            </a>
          </div>
          <CoworkingHubs listings={listings} />
        </div>
      </section>
      <CoworkingSignup />
    </div>
  )
}

function spaceLabel(listings: PlaceListing[], place: string) {
  const needle = place.toLowerCase()
  const count = listings.filter((listing) =>
    [listing.city, listing.street, listing.title].filter(Boolean).join(' ').toLowerCase().includes(needle),
  ).length
  return `${count} ${count === 1 ? 'Space' : 'Spaces'}`
}
