import type { RichTextBody } from '@/payload-types'

function plainBody(text: string): RichTextBody {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          version: 1,
          children: [
            {
              type: 'text',
              version: 1,
              text,
            },
          ],
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

export const sampleListing = {
  title: '201 N Brand',
  slug: '201-n-brand',
  kind: 'lease' as const,
  price: 4500,
  street: '201 N Brand Blvd',
  city: 'Glendale',
  state: 'CA',
  postalCode: '91203',
  propertyType: 'Office',
  pageTitle: 'Office for lease at 201 N Brand',
  metaDescription: 'A sample office listing in Glendale for the staging review.',
  robots: 'noindex' as const,
  canonicalUrl: '/listings/201-n-brand',
  h1: '201 N Brand',
  imageAlt: 'Office building at 201 N Brand in Glendale',
  socialTitle: '201 N Brand, Glendale',
  sitemap: false,
}

export const sampleCity = {
  title: 'Glendale',
  slug: 'glendale',
  status: 'published' as const,
  content: plainBody('Commercial real estate listings in Glendale, California.'),
  pageTitle: 'Commercial real estate in Glendale',
  metaDescription: 'Office and commercial listings in Glendale.',
  robots: 'index' as const,
  canonicalUrl: '/glendale',
  h1: 'Glendale',
  imageAlt: 'Glendale, California',
  socialTitle: 'Glendale commercial real estate',
  sitemap: true,
}

export const sampleOffice = {
  title: 'Office',
  slug: 'office',
  status: 'published' as const,
  content: plainBody('Office space for sale and for lease.'),
  pageTitle: 'Office space',
  metaDescription: 'Office listings for sale and for lease.',
  robots: 'index' as const,
  canonicalUrl: '/office',
  h1: 'Office',
  imageAlt: 'Office space',
  socialTitle: 'Office space',
  sitemap: true,
}

export const sampleRedirect = {
  fromPath: '/listings/brand-glendale',
  toPath: '/listings/201-n-brand',
  statusCode: 301,
}
