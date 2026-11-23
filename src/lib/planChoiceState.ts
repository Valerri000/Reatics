export type PlanChoiceState = 'signed-out' | 'signed-in' | 'error' | 'success'

export function planChoiceState(input: { signedIn: boolean; error?: boolean; success?: boolean }): PlanChoiceState {
  if (input.success) return 'success'
  if (input.error) return 'error'
  if (!input.signedIn) return 'signed-out'
  return 'signed-in'
}
