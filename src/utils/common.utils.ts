export const scrollToTop = (element?: HTMLDivElement | null) => {
  ;(element || window).scrollTo({ top: 0 })
}

export const mergeItems = <T extends { id: number }>(
  firstArr: T[],
  secondArr: T[]
): T[] => {
  const map = new Map<number, T>()

  for (const item of firstArr) map.set(item.id, item)

  for (const item of secondArr) map.set(item.id, item)

  return Array.from(map.values())
}
