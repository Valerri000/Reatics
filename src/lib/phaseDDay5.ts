import { favoriteCopy } from '@/lib/favoriteCopy'
import { createFolder } from '@/lib/favoriteFolders'
import { heartAction } from '@/lib/favoriteHeart'
import { monthlyAmountCents } from '@/lib/plans'
import { signupPaths } from '@/lib/signupPaths'

export function phaseDDay5Check() {
  const folders = createFolder([], 'Monday review', '2026-11-27T12:00:00.000Z')
  return {
    signup: signupPaths.map((path) => path.id),
    planCents: monthlyAmountCents,
    signedInSaves: heartAction(true) === 'save',
    signedOutSignIn: heartAction(false) === 'sign-in',
    folder: folders[0]?.name ?? '',
    print: favoriteCopy.print,
    estimated: favoriteCopy.estimated,
  }
}
