import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionAfterLoginHook,
  PayloadRequest,
} from 'payload'

type RoleDoc = { id?: number | string; role?: string | null; adminRole?: string | null }

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
  const actorId =
    typeof actor === 'number'
      ? actor
      : typeof actor === 'string' && actor !== ''
        ? Number(actor)
        : undefined
  await req.payload.create({
    collection: 'audit-log',
    data: {
      action: entry.action,
      target: entry.target,
      ...(Number.isInteger(actorId) ? { actor: actorId } : {}),
    },
    overrideAccess: true,
    req,
  })
}

export function roleChanged(previous: RoleDoc | undefined, next: RoleDoc) {
  if (!previous) return false
  return previous.role !== next.role || previous.adminRole !== next.adminRole
}

export const recordRoleChange: CollectionAfterChangeHook = async ({
  doc,
  operation,
  previousDoc,
  req,
}) => {
  if (operation !== 'update' || !roleChanged(previousDoc, doc)) return doc
  await writeAudit(req, {
    action: 'role-change',
    target: auditTarget('users', doc.id),
    actor: req.user?.id,
  })
  return doc
}

export const recordDelete: CollectionAfterDeleteHook = async ({ collection, doc, req }) => {
  await writeAudit(req, {
    action: 'delete',
    target: auditTarget(collection.slug, doc.id),
    actor: req.user?.id,
  })
}

export const recordSignIn: CollectionAfterLoginHook = async ({ req, user }) => {
  await writeAudit(req, {
    action: 'sign-in',
    target: auditTarget('users', user.id),
    actor: user.id,
  })
}
