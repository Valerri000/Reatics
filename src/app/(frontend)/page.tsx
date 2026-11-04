import React from 'react'

import { HomePage } from '@/components/home/HomePage'
import { loadHome } from '@/lib/loadHome'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const home = await loadHome()
  return {
    title: home.copy.title,
    description: home.copy.description,
  }
}

export default async function Page() {
  const home = await loadHome()
  return (
    <HomePage
      headline={home.copy.headline}
      cities={home.cities}
      posts={home.posts}
      listings={home.listings}
    />
  )
}
