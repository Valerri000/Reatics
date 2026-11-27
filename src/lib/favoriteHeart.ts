export type HeartAction = 'sign-in' | 'save'

export function heartAction(signedIn: boolean): HeartAction {
  return signedIn ? 'save' : 'sign-in'
}
