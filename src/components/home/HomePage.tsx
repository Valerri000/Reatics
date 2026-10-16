import React from 'react'

import { FeaturedListings } from '@/components/home/FeaturedListings'
import { HeroSearch } from '@/components/home/HeroSearch'
import { HomeSection } from '@/components/home/HomeSection'

export function HomePage() {
  return (
    <div>
      <HomeSection>
        <h1 className="m-0 max-w-[16ch] text-[40px] font-extrabold leading-[48px] text-brand xl:text-hero xl:leading-[75px]">
          Best-in-class commercial real estate search engine.
        </h1>
        <HeroSearch />
      </HomeSection>
      <FeaturedListings />
    </div>
  )
}
