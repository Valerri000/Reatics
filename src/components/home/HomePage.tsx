import React from 'react'

import { AboutSection } from '@/components/home/AboutSection'
import { AreaLinks } from '@/components/home/AreaLinks'
import { BlogSection } from '@/components/home/BlogSection'
import { FeaturedListings } from '@/components/home/FeaturedListings'
import { HeroSearch } from '@/components/home/HeroSearch'
import { ServicesSection } from '@/components/home/ServicesSection'
import { SignupSection } from '@/components/home/SignupSection'
import { StepsSection } from '@/components/home/StepsSection'
import { heroPhoto } from '@/lib/homeImages'

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
      <section className="relative flex min-h-[600px] items-center overflow-hidden bg-ink px-inset-phone py-section-phone text-white md:px-inset-tablet md:py-section xl:px-inset-desktop 2xl:px-inset-wide">
        <img src={heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/60 backdrop-blur-[2px]" />
        <div className="relative mx-auto w-full max-w-4xl py-8 text-center">
          <h1 className="m-0 text-4xl font-extrabold leading-tight text-white md:text-6xl">{headline}</h1>
          <p className="m-0 mx-auto mt-6 max-w-2xl text-xl leading-8 text-white/80">
            Find offices, coworking spaces, and retail locations across the country.
          </p>
          <HeroSearch />
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
