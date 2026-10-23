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
  content: 'Sample city page for the staging review. The public city layout is not in this phase.',
  pageTitle: 'Commercial real estate in Glendale',
  metaDescription: 'A sample city record so the SEO fields can be reviewed.',
  robots: 'index' as const,
  canonicalUrl: '/glendale',
  h1: 'Glendale',
  imageAlt: 'Glendale, California',
  socialTitle: 'Glendale commercial real estate',
  sitemap: false,
}

export const sampleRedirect = {
  fromPath: '/listings/brand-glendale',
  toPath: '/listings/201-n-brand',
  statusCode: 301,
}
