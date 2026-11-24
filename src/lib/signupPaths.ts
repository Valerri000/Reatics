import type { AccountRole } from '@/lib/account'

export type SignupPath = {
  id: AccountRole
  title: string
  text: string
  detail: string
}

export const signupPaths: SignupPath[] = [
  {
    id: 'space-seeker',
    title: 'Space seeker',
    text: 'I am looking for commercial or coworking space.',
    detail: 'Free. No DRE number.',
  },
  {
    id: 'broker',
    title: 'Broker',
    text: 'I represent clients or properties.',
    detail: '$129 a month. A DRE number is required.',
  },
  {
    id: 'owner',
    title: 'Owner with listings',
    text: 'I own commercial assets and want to list them.',
    detail: '$129 a month. A DRE number is required.',
  },
  {
    id: 'broker-owner',
    title: 'Broker and owner',
    text: 'I hold both paid roles.',
    detail: 'A DRE number is required. The directory needs it validated.',
  },
  {
    id: 'coworking',
    title: 'Coworking provider',
    text: 'I manage flexible workspaces.',
    detail: 'Free. The referral agreement is required.',
  },
]

export function signupPath(id: string) {
  return signupPaths.find((path) => path.id === id) ?? null
}
