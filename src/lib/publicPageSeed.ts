import type { Page } from '@/payload-types'

import { blocksBody, type BodyBlock } from '@/lib/bodyBlocks'
import { publicPageSlugs, type PublicPageSlug } from '@/lib/publicPages'

export type PageSeed = Pick<
  Page,
  | 'title'
  | 'slug'
  | 'status'
  | 'content'
  | 'pageTitle'
  | 'metaDescription'
  | 'robots'
  | 'canonicalUrl'
  | 'h1'
  | 'imageAlt'
  | 'socialTitle'
  | 'socialDescription'
  | 'sitemap'
>

function pageSeed(input: {
  title: string
  slug: PublicPageSlug
  h1: string
  pageTitle: string
  description: string
  blocks: BodyBlock[]
}): PageSeed {
  return {
    title: input.title,
    slug: input.slug,
    status: 'published',
    content: blocksBody(input.blocks),
    pageTitle: input.pageTitle,
    metaDescription: input.description,
    robots: 'index',
    canonicalUrl: `/${input.slug}`,
    h1: input.h1,
    imageAlt: input.h1,
    socialTitle: input.pageTitle,
    socialDescription: input.description,
    sitemap: true,
  }
}

export const publicPageSeeds: PageSeed[] = [
  pageSeed({
    title: 'About Us',
    slug: 'about',
    h1: 'About Reatics',
    pageTitle: 'About Reatics',
    description:
      'Reatics is a commercial real estate listing platform for brokers, workspace providers, and landlords.',
    blocks: [
      {
        kind: 'paragraph',
        text: 'Reatics is a commercial real estate listing platform for brokers, workspace providers, and landlords. Tenants use it to find a workplace or an investment property.',
      },
      { kind: 'h2', text: 'Who it is for' },
      {
        kind: 'paragraph',
        text: 'Brokers list spaces. Landlords and coworking providers advertise offices. Companies looking for space search in one place.',
      },
    ],
  }),
  pageSeed({
    title: 'Services',
    slug: 'services',
    h1: 'Services',
    pageTitle: 'Commercial real estate services',
    description: 'Search, list, and market commercial property on Reatics.',
    blocks: [
      {
        kind: 'paragraph',
        text: 'Reatics helps you search, list, and market commercial properties.',
      },
      { kind: 'h2', text: 'For brokers and landlords' },
      {
        kind: 'paragraph',
        text: 'Publish a listing, keep the details current, and reach people who are looking for space.',
      },
      { kind: 'h2', text: 'For companies looking for space' },
      {
        kind: 'paragraph',
        text: 'Search by place, by sale or lease, and by property type.',
      },
    ],
  }),
  pageSeed({
    title: 'Contact Us',
    slug: 'contact',
    h1: 'Contact Us',
    pageTitle: 'Contact Reatics',
    description: 'Send a message to the Reatics office in Glendale, or call 1-888-518-9168.',
    blocks: [
      {
        kind: 'paragraph',
        text: 'Send a message and the team will reply. You can also call or write to the Glendale office.',
      },
    ],
  }),
  pageSeed({
    title: 'Scholarship',
    slug: 'scholarship',
    h1: 'Scholarship',
    pageTitle: 'Reatics scholarship',
    description:
      'The Reatics scholarship supports students studying commercial real estate or brokerage.',
    blocks: [
      {
        kind: 'paragraph',
        text: 'The Reatics scholarship supports students who are studying commercial real estate, brokerage, or a related field.',
      },
      { kind: 'h2', text: 'Who can apply' },
      {
        kind: 'paragraph',
        text: 'The application is open to students enrolled in a college or university program. Details for the current year are posted on this page.',
      },
      { kind: 'h2', text: 'What to send' },
      {
        kind: 'paragraph',
        text: 'Send your name, your school, and a short note about why you are studying the field.',
      },
    ],
  }),
  pageSeed({
    title: 'Steps to Renting an Office Space',
    slug: 'steps',
    h1: 'Steps to Renting an Office Space',
    pageTitle: 'Steps to renting an office',
    description: 'The steps from deciding what you need to signing an office lease.',
    blocks: [
      {
        kind: 'paragraph',
        text: 'Renting an office starts with the space you need and ends with a signed agreement.',
      },
      { kind: 'h2', text: 'Decide what you need' },
      {
        kind: 'paragraph',
        text: 'Choose the city, the size, and whether you want a private office or a coworking desk.',
      },
      { kind: 'h2', text: 'Search and compare' },
      {
        kind: 'paragraph',
        text: 'Review the listings, the price, and the location. Keep the ones that fit.',
      },
      { kind: 'h2', text: 'Tour and ask' },
      {
        kind: 'paragraph',
        text: 'Ask about the term, the costs, and when the space is available.',
      },
      { kind: 'h2', text: 'Agree and sign' },
      {
        kind: 'paragraph',
        text: 'When the terms are right, the lease is prepared and signed.',
      },
    ],
  }),
]

export function seededPageSlugs() {
  return publicPageSeeds.map((page) => page.slug)
}

export function seededPagesMatchPublicSlugs() {
  return seededPageSlugs().join(',') === publicPageSlugs.join(',')
}
