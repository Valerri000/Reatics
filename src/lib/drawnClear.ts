import { clearArea, type AreaPoint } from '@/lib/mapArea'

export function clearedDrawnArea(area: AreaPoint[]) {
  return area.filter(() => false).concat(clearArea())
}
