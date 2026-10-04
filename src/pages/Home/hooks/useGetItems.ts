import {
  usePostApiItemsMutation,
  usePutApiItemsMutation,
  type GetApiItemsApiArg,
  type GetApiItemsByIdApiResponse,
} from '@/api'

import { useInView } from 'react-intersection-observer'

import { useCallback, useEffect, useRef, useState } from 'react'
import { PAGINATION_DEFAULT, ROOT_MARGIN } from '../Home.config'
import { scrollToTop } from '@/utils/common.utils'
import { toastSuccess } from '@/utils/notifications.utils'
import type { UseGetItemsProps } from '../Home.types'
import type { ItemsState } from '@/store/itemsState.slice'
import { useAppDispatch } from '@/store/hooks'

export const useGetItems = ({
  getItems,
  switchOffLoader,
  switchOnLoader,
  isLoadingData,
}: UseGetItemsProps, itemsState: ItemsState['value']) => {
  const dispatch = useAppDispatch()
  
  const [createItem, { isLoading: isLoadingCreateItem }] =
    usePostApiItemsMutation()

  const [changeItem] = usePutApiItemsMutation()

  const { ref: thresholdRef, inView: isThresholdInView } = useInView({
    rootMargin: ROOT_MARGIN,
    skip: isLoadingData,
  })

  const [items, setItems] = useState<GetApiItemsByIdApiResponse[]>([])

  const paginationRef = useRef(PAGINATION_DEFAULT)

  const chooseItem = useCallback(
    async (chosenItem: GetApiItemsByIdApiResponse) => {
      switchOnLoader()

      const changeItemResponse = await changeItem({
        body: {
          ...chosenItem,
          isChosen: !chosenItem.isChosen,
        },
      })

      if (changeItemResponse.data) {
        setItems((prevItems) => prevItems.map((item) => 
          item.id === chosenItem.id 
            ? {
              ...item,
              isChosen: !item.isChosen
            } 
            : item
        ))

        toastSuccess(`Пользователь с id - ${chosenItem.id} ${chosenItem.isChosen 
          ? 'убран'
          : 'выбран'}!`)
      }

      switchOffLoader()
    },
    [changeItem, switchOffLoader, switchOnLoader]
  )

  const filterItems = useCallback(
    async (itemIdFilter?: string) => {
      scrollToTop()

      switchOnLoader()

      const response = await getItems({ itemIdFilter })

      if (response.data) {
        paginationRef.current = {
          ...response.data.pagination,
          offset: PAGINATION_DEFAULT.limit,
        }

        setItems(response.data.data)
      }

      switchOffLoader()
    },
    [getItems, switchOffLoader, switchOnLoader]
  )

  const loadItems = useCallback(
    async (props: GetApiItemsApiArg = {}) => {
      switchOnLoader()

      const response = await getItems(props)

      if (response.data) {
        paginationRef.current = {
          ...response.data.pagination,
          offset: response.data.pagination.hasMore
            ? paginationRef.current.offset + response.data.pagination.limit
            : paginationRef.current.offset,
        }

        setItems((prevItems) => [...prevItems, ...(response.data?.data || [])])
      }

      switchOffLoader()
    },
    [getItems, switchOffLoader, switchOnLoader]
  )

  const addItem = useCallback(
    async (itemId?: string) => {
      switchOnLoader()

      scrollToTop()

      const createItemResponse = await createItem({
        body: { id: Number(itemId) },
      })

      if (createItemResponse.data) {
        const getItemsResponse = await getItems({})

        if (getItemsResponse.data) {
          paginationRef.current = {
            ...getItemsResponse.data.pagination,
            offset: PAGINATION_DEFAULT.limit,
          }

          setItems(getItemsResponse.data.data)
        }

        toastSuccess(`Пользователь с id - ${itemId} успешно создан!`)
      }

      switchOffLoader()
    },
    [createItem, getItems, switchOffLoader, switchOnLoader]
  )

  useEffect(() => {
    loadItems()
  }, [loadItems])

  useEffect(() => {
    if (isThresholdInView && paginationRef.current.hasMore) {
      loadItems({
        offset: paginationRef.current.offset,
        itemIdFilter: paginationRef.current.itemIdFilter,
      })
    }
  }, [loadItems, isThresholdInView])

  return {
    thresholdRef,
    chooseItem,
    filterItems,
    addItem,
    items,
    isLoadingCreateItem,
  }
}
