import Link from 'next/link'
import React from 'react'

import { formatListingPrice, type ListingKind } from '@/lib/listingPrice'

const labels: Record<ListingKind, string> = {
  sale: 'For sale',
  lease: 'For lease',
  coworking: 'Coworking',
}

type ListingCardProps = {
  href: string
  imageUrl: string
  imageAlt: string
  kind: ListingKind
  price: number | null
  street: string
  cityLine: string
  propertyType: string
}

export function ListingCard({
  href,
  imageUrl,
  imageAlt,
  kind,
  price,
  street,
  cityLine,
  propertyType,
}: ListingCardProps) {
  return (
    <article className="border border-line bg-white">
      <Link href={href}>
        <span className="relative block">
          <img src={imageUrl} alt={imageAlt} className="aspect-[3/2] w-full object-cover" />
          <span className="absolute left-3 top-3 bg-brand px-3 py-2 text-sm font-bold text-white">
            {labels[kind]}
          </span>
        </span>
        <span className="block p-4">
          <span className="block text-[22px] font-extrabold leading-8 text-ink md:text-[25px]">
            {formatListingPrice(kind, price)}
          </span>
          <span className="mt-2 block text-base text-slate">{street}</span>
          <span className="block text-base text-slate">{cityLine}</span>
          <span className="mt-2 block text-base text-gray">{propertyType}</span>
        </span>
      </Link>
    </article>
  )
}
