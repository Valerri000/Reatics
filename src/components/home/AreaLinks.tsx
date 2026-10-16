import Link from 'next/link'
import React from 'react'

import { HomeSection } from '@/components/home/HomeSection'

const coworking = [
  { href: '/coworking?city=san-francisco', label: 'Coworking space San Francisco, CA' },
  { href: '/coworking?city=pasadena', label: 'Coworking space Pasadena, CA' },
  { href: '/coworking?city=glendale', label: 'Coworking space Glendale, CA' },
  { href: '/coworking?city=santa-monica', label: 'Coworking space Santa Monica, CA' },
]

const commercial = [
  { href: '/commercial?city=glendale', label: 'Commercial real estate Glendale, CA' },
  { href: '/commercial?city=pasadena', label: 'Commercial real estate Pasadena, CA' },
  { href: '/commercial?city=los-angeles', label: 'Commercial real estate Los Angeles, CA' },
]

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

export function AreaLinks() {
  return (
    <HomeSection id="areas" tone="mist">
      <div className="grid gap-10">
        <CityList title="Find coworking spaces in:" links={coworking} />
        <CityList title="Find commercial real estate in:" links={commercial} />
      </div>
    </HomeSection>
  )
}
