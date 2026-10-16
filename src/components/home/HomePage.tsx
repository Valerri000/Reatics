import React from 'react'

import { AboutSection } from '@/components/home/AboutSection'
import { BlogSection } from '@/components/home/BlogSection'
import { FeaturedListings } from '@/components/home/FeaturedListings'
import { HeroSearch } from '@/components/home/HeroSearch'
import { HomeSection } from '@/components/home/HomeSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { SignupSection } from '@/components/home/SignupSection'
import { StepsSection } from '@/components/home/StepsSection'

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
      <AboutSection />
      <ServicesSection />
      <StepsSection />
      <BlogSection />
      <SignupSection />
    </div>
  )
}
