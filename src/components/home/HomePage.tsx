import React from 'react'

import { AboutSection } from '@/components/home/AboutSection'
import { AreaLinks } from '@/components/home/AreaLinks'
import { BlogSection } from '@/components/home/BlogSection'
import { FeaturedListings } from '@/components/home/FeaturedListings'
import { HeroSearch } from '@/components/home/HeroSearch'
import { HomeSection } from '@/components/home/HomeSection'
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
      <HomeSection>
        <h1 className="m-0 max-w-[16ch] text-[40px] font-extrabold leading-[48px] text-brand xl:text-hero xl:leading-[75px]">
          {headline}
        </h1>
        <HeroSearch />
      </HomeSection>
      <FeaturedListings listings={listings} />
      <AboutSection />
      <ServicesSection />
      <StepsSection />
      <BlogSection posts={posts} />
      <SignupSection />
      <AreaLinks links={cities} />
    </div>
  )
}
