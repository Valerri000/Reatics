'use client'

import Link from 'next/link'

import { useAuth } from '@/components/auth/AuthProvider'
import { HeartIcon } from '@/components/icons'
import { PhoneNumber } from '@/components/PhoneNumber'
import { designPhoto, propertyPhotos } from '@/lib/homeImages'
import { emptyFeatured } from '@/lib/homeListings'
import { listingCardFields, type PlaceListing } from '@/lib/placeList'
import { saveHeart } from '@/lib/saveHeart'

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function CoworkingHubs({ listings }: { listings: PlaceListing[] }) {
  if (listings.length === 0) {
    return <p className="m-0 text-base font-semibold text-ink">{emptyFeatured}</p>
  }

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
      {listings.map((listing, index) => {
        const card = listingCardFields(listing)
        const amount = card.price == null ? 'Price on request' : money.format(card.price)
        const address = [card.street, listing.city].filter(Boolean).join(', ')
        return (
          <HubCard
            key={listing.slug}
            href={card.href}
            imageUrl={designPhoto(card.imageUrl, propertyPhotos, index)}
            imageAlt={card.imageAlt}
            badge={card.propertyType || 'Coworking'}
            amount={amount}
            suffix={card.price == null ? '' : '/ Mo'}
            address={address || card.title}
          />
        )
      })}
    </div>
  )
}

function HubCard({
  href,
  imageUrl,
  imageAlt,
  badge,
  amount,
  suffix,
  address,
}: {
  href: string
  imageUrl: string
  imageAlt: string
  badge: string
  amount: string
  suffix: string
  address: string
}) {
  const auth = useAuth()

  return (
    <article className="card-lift overflow-hidden rounded-[3rem] bg-white">
      <div className="group relative h-[280px] overflow-hidden">
        <img src={imageUrl} alt={imageAlt} className="cowork-photo transition duration-1000 group-hover:scale-110" />
        <div className="absolute left-8 top-8">
          <span className="rounded-full bg-brand px-4 py-2 text-[9px] font-black uppercase tracking-widest text-white shadow-xl">
            {badge}
          </span>
        </div>
        <button
          type="button"
          aria-label="Save listing"
          className="absolute right-8 top-8 flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-slate-400 backdrop-blur-md hover:text-brand"
          onClick={() => {
            if (!auth.user) {
              auth.openSignIn()
              return
            }
            void saveHeart(href)
          }}
        >
          <HeartIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="p-10">
        <h3 className="m-0 text-3xl font-black text-slate-900">
          {amount} {suffix ? <span className="text-sm font-bold text-slate-300">{suffix}</span> : null}
        </h3>
        <p className="m-0 mt-2 font-bold text-slate-400">{address}</p>
        <div className="mt-8 flex items-center justify-between border-t border-blue-50 pt-8">
          <div className="flex flex-col">
            <span className="mb-1 text-[9px] font-black uppercase tracking-widest text-slate-300">Direct Line</span>
            <PhoneNumber size="md" tone="ink" className="text-sm font-black" />
          </div>
          <Link href={href} className="group rounded-2xl bg-blue-50 px-6 py-3 no-underline hover:bg-brand">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand group-hover:text-white">
              Book Tour
            </span>
          </Link>
        </div>
      </div>
    </article>
  )
}
