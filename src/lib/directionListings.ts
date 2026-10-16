import type { ListingKind } from '@/lib/listingPrice'

export type DirectionListing = {
  href: string
  imageUrl: string
  imageAlt: string
  kind: ListingKind
  price: number | null
  rate?: number | null
  street: string
  cityLine: string
  propertyType: string
}

export const directionListings: DirectionListing[] = [
  {
    href: '/featured',
    imageUrl: '/direction-photo.svg',
    imageAlt: 'Commercial property',
    kind: 'sale',
    price: 1250000,
    street: '201 N Brand Blvd',
    cityLine: 'Glendale, CA 91203',
    propertyType: 'Office',
  },
  {
    href: '/featured',
    imageUrl: '/direction-photo.svg',
    imageAlt: 'Commercial property',
    kind: 'lease',
    price: 4500,
    rate: 32,
    street: '260 S Los Robles Ave',
    cityLine: 'Pasadena, CA 91101',
    propertyType: 'Office',
  },
  {
    href: '/featured',
    imageUrl: '/direction-photo.svg',
    imageAlt: 'Coworking space',
    kind: 'coworking',
    price: 450,
    rate: 32,
    street: '1000 E Walnut St',
    cityLine: 'Pasadena, CA 91106',
    propertyType: 'Coworking',
  },
  {
    href: '/featured',
    imageUrl: '/direction-photo.svg',
    imageAlt: 'Commercial property',
    kind: 'sale',
    price: 2100000,
    street: '700 S Flower St',
    cityLine: 'Los Angeles, CA 90017',
    propertyType: 'Retail',
  },
  {
    href: '/featured',
    imageUrl: '/direction-photo.svg',
    imageAlt: 'Commercial property',
    kind: 'lease',
    price: 6200,
    rate: 36,
    street: '450 N Brand Blvd',
    cityLine: 'Glendale, CA 91203',
    propertyType: 'Medical',
  },
  {
    href: '/featured',
    imageUrl: '/direction-photo.svg',
    imageAlt: 'Coworking space',
    kind: 'coworking',
    price: 650,
    rate: 40,
    street: '1313 Ocean Ave',
    cityLine: 'Santa Monica, CA 90401',
    propertyType: 'Coworking',
  },
]
