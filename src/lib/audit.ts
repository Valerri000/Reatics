import type { CollectionAfterLoginHook, PayloadRequest } from 'payload'

export function auditTarget(collection: string, id: number | string) {
  return `${collection}/${id}`
}

export async function writeAudit(
  req: PayloadRequest,
  entry: {
    action: 'sign-in' | 'role-change' | 'delete'
    target: string
    actor?: number | string | null
  },
) {
  const actor = entry.actor === undefined ? req.user?.id : entry.actor
  await req.payload.create({
    collection: 'audit-log',
    data: {
      action: entry.action,
      target: entry.target,
      ...(actor ? { actor } : {}),
    },
    overrideAccess: true,
    req,
  })
}

export const recordSignIn: CollectionAfterLoginHook = async ({ req, user }) => {
  await writeAudit(req, {
    action: 'sign-in',
    target: auditTarget('users', user.id),
    actor: user.id,
  })
}
