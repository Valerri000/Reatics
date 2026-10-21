import { s3Storage } from '@payloadcms/storage-s3'

export function objectStorageEnabled(env: NodeJS.ProcessEnv = process.env) {
  return Boolean(env.S3_BUCKET)
}

export function mediaStorage(env: NodeJS.ProcessEnv = process.env) {
  const bucket = env.S3_BUCKET || ''
  const enabled = objectStorageEnabled(env)
  return s3Storage({
    bucket,
    enabled,
    alwaysInsertFields: true,
    disableLocalStorage: enabled,
    collections: {
      media: true,
    },
    config: {
      region: env.S3_REGION || 'us-east-2',
      ...(enabled
        ? {
            credentials: {
              accessKeyId: env.S3_ACCESS_KEY_ID || '',
              secretAccessKey: env.S3_SECRET_ACCESS_KEY || '',
            },
          }
        : {}),
    },
  })
}
