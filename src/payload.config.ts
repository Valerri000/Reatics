import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { AuditLog } from './collections/AuditLog'
import { Billing } from './collections/Billing'
import { Cities } from './collections/Cities'
import { Companies } from './collections/Companies'
import { CompanyMembers } from './collections/CompanyMembers'
import { ContactMessages } from './collections/ContactMessages'
import { DealParticipants } from './collections/DealParticipants'
import { Deals } from './collections/Deals'
import { Glossary } from './collections/Glossary'
import { LeaseDrafts } from './collections/LeaseDrafts'
import { Listings } from './collections/Listings'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { PropertyTypes } from './collections/PropertyTypes'
import { Redirects } from './collections/Redirects'
import { ScreeningRequests } from './collections/ScreeningRequests'
import { SignedDocuments } from './collections/SignedDocuments'
import { Users } from './collections/Users'
import { mediaStorage } from './lib/storage'

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
  collections: [
    Users,
    Pages,
    Posts,
    Glossary,
    Cities,
    PropertyTypes,
    Listings,
    Billing,
    Media,
    Redirects,
    Companies,
    CompanyMembers,
    ContactMessages,
    Deals,
    DealParticipants,
    ScreeningRequests,
    LeaseDrafts,
    SignedDocuments,
    AuditLog,
  ],
  onInit: async (payload) => {
    try {
      const { ensurePublicPages, ensureStorySamples } = await import('./lib/seedReview')
      await ensurePublicPages(payload)
      await ensureStorySamples(payload)
    } catch {
      return
    }
  },
  editor: lexicalEditor(),
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    migrationDir: path.resolve(dirname, 'migrations'),
    pool: {
      connectionString: databaseUrl,
      ...(hostedDatabase && databaseUrl ? { ssl: { rejectUnauthorized: false } } : {}),
    },
  }),
  sharp,
  plugins: [mediaStorage()],
})
