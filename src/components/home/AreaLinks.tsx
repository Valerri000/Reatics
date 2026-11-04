import Link from 'next/link'
import React from 'react'

import { HomeSection } from '@/components/home/HomeSection'

function CityList({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="m-0 text-[22px] font-extrabold leading-8 text-ink md:text-[28px]">{title}</h2>
      <ul className="m-0 mt-4 grid list-none gap-3 p-0 md:grid-cols-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-base font-bold text-brand">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function AreaLinks({ links }: { links: { href: string; label: string }[] }) {
  return (
    <HomeSection id="areas" tone="mist">
      <CityList title="Find commercial real estate in:" links={links} />
    </HomeSection>
  )
}
