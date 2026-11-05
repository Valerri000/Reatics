export const heroPhoto = '/home/hero.jpg'

export const propertyPhotos = [
  '/home/property-1.jpg',
  '/home/property-2.jpg',
  '/home/property-3.jpg',
  '/home/property-4.jpg',
  '/home/property-5.jpg',
  '/home/property-6.jpg',
] as const

export const blogPhotos = ['/home/blog-1.jpg', '/home/blog-2.jpg', '/home/blog-3.jpg'] as const

const placeholder = '/direction-photo.svg'

export function designPhoto(url: string | null | undefined, photos: readonly string[], index: number) {
  if (url && url !== placeholder) return url
  return photos[index % photos.length]
}
