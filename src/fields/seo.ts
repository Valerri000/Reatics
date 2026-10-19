import type { Field } from 'payload'

export const seoFieldList: Field[] = [
  {
    name: 'pageTitle',
    type: 'text',
    label: 'Page title',
  },
  {
    name: 'metaDescription',
    type: 'textarea',
    label: 'Meta description',
  },
  {
    name: 'robots',
    type: 'select',
    label: 'Index',
    defaultValue: 'index',
    options: [
      { label: 'Index', value: 'index' },
      { label: 'Noindex', value: 'noindex' },
    ],
  },
  {
    name: 'canonicalUrl',
    type: 'text',
    label: 'Canonical URL',
  },
  {
    name: 'h1',
    type: 'text',
    label: 'H1',
  },
  {
    name: 'imageAlt',
    type: 'text',
    label: 'Image alt',
  },
  {
    name: 'socialTitle',
    type: 'text',
    label: 'Social title',
  },
  {
    name: 'sitemap',
    type: 'checkbox',
    label: 'Include in sitemap',
    defaultValue: true,
  },
]
