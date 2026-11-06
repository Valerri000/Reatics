import React from 'react'

import { AboutSection } from '@/components/home/AboutSection'
import { AreaLinks } from '@/components/home/AreaLinks'
import { BlogSection } from '@/components/home/BlogSection'
import { FeaturedListings } from '@/components/home/FeaturedListings'
import { HeroBackdrop } from '@/components/home/HeroBackdrop'
import { HeroSearch } from '@/components/home/HeroSearch'
import { ServicesSection } from '@/components/home/ServicesSection'
import { SignupSection } from '@/components/home/SignupSection'
import { StepsSection } from '@/components/home/StepsSection'

export function HomePage({
  headline,
  cities,
  posts,
  listings,
}: {
  headline: string
  cities: { href: string; label: string }[]
  posts: { href: string; title: string; byline: string }[]
  listings: Parameters<typeof FeaturedListings>[0]['listings']
}) {
  return (
    <div>
      <section className="relative overflow-hidden bg-[#0c3470] px-inset-phone py-6 text-white md:px-inset-tablet md:py-8 xl:px-inset-desktop 2xl:px-inset-wide">
        <HeroBackdrop />
        <div className="relative z-10 max-w-5xl py-4 lg:py-6">
          <p className="m-0 text-[11px] font-bold uppercase tracking-[0.22em] text-white/75">Commercial real estate</p>
          <h1 className="m-0 mt-4 max-w-xl text-4xl font-extrabold leading-tight text-white md:text-5xl">{headline}</h1>
          <p className="m-0 mt-4 max-w-lg text-lg leading-7 text-white/85">
            Find offices, coworking spaces, and retail locations across the country.
          </p>
          <HeroSearch />
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            <Stat icon="building" value="10,000+" label="Listings" />
            <Stat icon="people" value="5,000+" label="Brokers" />
            <Stat icon="pin" value="500+" label="Cities" />
            <Stat icon="grid" value="Multiple" label="Property Types" />
          </dl>
        </div>
      </section>
      <FeaturedListings listings={listings} />
      <div className="lg:grid lg:grid-cols-2">
        <AboutSection />
        <ServicesSection />
      </div>
      <StepsSection />
      <BlogSection posts={posts} />
      <SignupSection />
      <AreaLinks links={cities} />
    </div>
  )
}

function Stat({ icon, value, label }: { icon: 'building' | 'people' | 'pin' | 'grid'; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <StatIcon name={icon} />
      <div>
        <dt className="m-0 text-lg font-extrabold leading-6 text-white">{value}</dt>
        <dd className="m-0 text-sm text-white/75">{label}</dd>
      </div>
    </div>
  )
}

function StatIcon({ name }: { name: 'building' | 'people' | 'pin' | 'grid' }) {
  const common = { className: 'h-6 w-6 text-white/90', viewBox: '0 0 24 24', 'aria-hidden': true as const }
  if (name === 'people') {
    return (
      <svg {...common}>
        <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM16.5 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM3 19c0-2.5 2.2-4 5-4s5 1.5 5 4M14 15.2c1.8.3 4 1.4 4 3.8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )
  }
  if (name === 'pin') {
    return (
      <svg {...common}>
        <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="11" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )
  }
  if (name === 'grid') {
    return (
      <svg {...common}>
        <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M4 20V9l8-5 8 5v11H4zM9 20v-6h6v6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
