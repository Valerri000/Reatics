import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Billing } from './collections/Billing'
import { Companies } from './collections/Companies'
import { Deals } from './collections/Deals'
import { Listings } from './collections/Listings'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Redirects } from './collections/Redirects'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const databaseUrl = process.env.DATABASE_URL || ''
const hostedDatabase = !/@(localhost|127\.0\.0\.1)(:|\/|$)/.test(databaseUrl)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Pages, Listings, Billing, Media, Redirects, Companies, Deals],
  editor: lexicalEditor(),
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseUrl,
      ...(hostedDatabase && databaseUrl ? { ssl: { rejectUnauthorized: false } } : {}),
    },
  }),
  sharp,
  plugins: [],
})
