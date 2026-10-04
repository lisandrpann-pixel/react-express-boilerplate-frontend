import { useCallback, useRef, useState } from 'react'
import { PAGINATION_DEFAULT, ROOT_MARGIN } from '../Home.config'
import { useInView } from 'react-intersection-observer'
import { scrollToTop as scrollToTopOrigin } from '@/utils/common.utils'

export const useItemsColumn = () => {
  const [isLoadingData, setLoadingData] = useState(true)

  const paginationRef = useRef(PAGINATION_DEFAULT)

  const [columnEl, setColumnEl] = useState<HTMLDivElement | null>(null)

  const columnRef = useCallback(
    (node: HTMLDivElement | null) => setColumnEl(node),
    []
  )

  const { ref: thresholdRef, inView: isThresholdInView } = useInView({
    root: columnEl,
    rootMargin: ROOT_MARGIN,
    skip: isLoadingData,
  })

  const switchOnLoader = useCallback(() => {
    setLoadingData(true)
  }, [])

  const switchOffLoader = useCallback(() => {
    setLoadingData(false)
  }, [])

  const scrollToTop = useCallback(() => {
    scrollToTopOrigin(columnEl)
  }, [columnEl])

  return {
    scrollToTop,
    isLoadingData,
    paginationRef,
    columnRef,
    thresholdRef,
    isThresholdInView,
    switchOnLoader,
    switchOffLoader,
  }
}
