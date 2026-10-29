import { blocksBody } from '@/lib/bodyBlocks'

function storyFields(input: { h1: string; pageTitle: string; description: string }) {
  return {
    h1: input.h1,
    pageTitle: input.pageTitle,
    metaDescription: input.description,
    socialTitle: input.pageTitle,
    socialDescription: input.description,
    imageAlt: input.h1,
  }
}

export const samplePost = {
  title: 'How to read a listing',
  slug: 'how-to-read-a-listing',
  status: 'published' as const,
  publishedOn: '2026-10-29T15:00:00.000Z',
  ...storyFields({
    h1: 'How to read a listing',
    pageTitle: 'How to read a listing',
    description: 'What to compare on a commercial listing before you ask for a tour.',
  }),
  content: blocksBody([
    {
      kind: 'paragraph',
      text: 'A listing tells you the price, the size, and the place. Read those three before you spend time on a tour.',
    },
    { kind: 'h2', text: 'What to compare' },
    {
      kind: 'paragraph',
      text: 'Compare the rent or the sale price, the square footage, and how the space is used.',
    },
  ]),
  robots: 'index' as const,
  canonicalUrl: '/blog/how-to-read-a-listing',
  sitemap: true,
}

export const sampleDraftPost = {
  title: 'Office tour notes',
  slug: 'office-tour-notes',
  status: 'draft' as const,
  ...storyFields({
    h1: 'Office tour notes',
    pageTitle: 'Office tour notes',
    description: 'A draft note from a tour.',
  }),
  content: blocksBody([
    {
      kind: 'paragraph',
      text: 'A draft note from a tour. It stays off the public blog until it is published.',
    },
  ]),
  robots: 'noindex' as const,
  canonicalUrl: '/blog/office-tour-notes',
  sitemap: false,
}

export const sampleTerm = {
  term: 'Cap rate',
  slug: 'cap-rate',
  status: 'published' as const,
  definition: blocksBody([
    {
      kind: 'paragraph',
      text: 'The capitalization rate is the yearly net operating income divided by the price.',
    },
  ]),
  ...storyFields({
    h1: 'Cap rate',
    pageTitle: 'Cap rate',
    description: 'The capitalization rate is the yearly net operating income divided by the price.',
  }),
  robots: 'index' as const,
  canonicalUrl: '/glossary/cap-rate',
  sitemap: true,
}
