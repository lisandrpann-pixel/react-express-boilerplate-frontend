import { Card } from '@/components/Card'
import { Column } from '@/components/Column'
import { FilterForm } from '../FilterForm'
import { useCallback, useEffect } from 'react'
import { ColumnHeader } from '@/components/ColumnHeader'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Empty } from '@/components/Empty'
import { useLazyGetApiItemsQuery, usePutApiItemsMutation, type GetApiItemsApiArg, type GetApiItemsByIdApiResponse } from '@/api'
import { PAGINATION_DEFAULT } from '../../Home.config'
import { Loader } from '@/components/Loader'
import { useItemsColumn } from '../../hooks/useItemsColumn'
import styles from './ChosenItemsColumn.module.css'
import {
  filterChosenItemsAction,
  loadChosenItemsAction,
  refetchChosenItemsAction,
  selectChosenItems,
} from '@/store/chosenItemsState.slice'
import { toastSuccess } from '@/utils/notifications.utils'
import { chooseItemAction } from '@/store/itemsState.slice'
import { selectHasToRefetchChosenItems, setHasToRefetchChosenItemsAction } from '@/store/sharedFlagsState.slice'

export const ChosenItemsColumn = () => {
  const {
    scrollToTop,
    isLoadingData,
    paginationRef,
    columnRef,
    thresholdRef,
    isThresholdInView,
    switchOnLoader,
    switchOffLoader,
  } = useItemsColumn()

  const hasToRefetchChosenItems = useAppSelector(selectHasToRefetchChosenItems)

  const [getItems, { data, isSuccess: isSuccessGetItems }] =
    useLazyGetApiItemsQuery()

  const getChosenItems = useCallback(
    (props: GetApiItemsApiArg) => {
      return getItems({ ...props, isChosenFilter: true })
    },
    [getItems]
  )

  const hasMore = data?.pagination.hasMore

  const chosenItemsState = useAppSelector(selectChosenItems)

  const dispatch = useAppDispatch()

  const [changeItem] = usePutApiItemsMutation()

  const filterItems = useCallback(
    async (itemIdFilter?: string) => {
      scrollToTop()

      switchOnLoader()

      const response = await getChosenItems({ itemIdFilter })

      if (response.data) {
        paginationRef.current = {
          ...response.data.pagination,
          offset: PAGINATION_DEFAULT.limit,
        }

        dispatch(filterChosenItemsAction(response.data.data))
      }

      switchOffLoader()
    },
    [
      dispatch,
      getChosenItems,
      paginationRef,
      scrollToTop,
      switchOffLoader,
      switchOnLoader,
    ]
  )

  const refetchItems = useCallback(
    async () => {
      switchOnLoader()

      const response = await getChosenItems({
        offset: 0,
        limit: paginationRef.current.offset || PAGINATION_DEFAULT.limit,
      })

      if (response.data) {
        paginationRef.current = {
          ...response.data.pagination,
          offset: response.data.pagination.hasMore
            ? paginationRef.current.offset + response.data.pagination.limit
            : paginationRef.current.offset,
        }

        dispatch(refetchChosenItemsAction(response.data.data))
        dispatch(setHasToRefetchChosenItemsAction(false))
      }

      switchOffLoader()
    },
    [dispatch, getChosenItems, paginationRef, switchOffLoader, switchOnLoader]
  )

  const loadItems = useCallback(
    async (props: GetApiItemsApiArg = {}) => {
      switchOnLoader()

      const response = await getChosenItems(props)

      if (response.data) {
        paginationRef.current = {
          ...response.data.pagination,
          offset: response.data.pagination.hasMore
            ? paginationRef.current.offset + response.data.pagination.limit
            : paginationRef.current.offset,
        }

        dispatch(loadChosenItemsAction(response.data.data))
      }

      switchOffLoader()
    },
    [dispatch, getChosenItems, paginationRef, switchOffLoader, switchOnLoader]
  )

  const removeItem = useCallback(
    async (chosenItem: GetApiItemsByIdApiResponse) => {
      switchOnLoader()

      const changeItemResponse = await changeItem({
        body: {
          ...chosenItem,
          isChosen: !chosenItem.isChosen,
        },
      })

      if (changeItemResponse.data) {
        dispatch(chooseItemAction(chosenItem))
        dispatch(setHasToRefetchChosenItemsAction(true))

        toastSuccess(
          `Пользователь с id - ${chosenItem.id} ${
            chosenItem.isChosen ? 'убран' : 'выбран'
          }!`
        )
      }

      switchOffLoader()
    },
    [changeItem, dispatch, switchOffLoader, switchOnLoader]
  )

  useEffect(() => {
    if (hasToRefetchChosenItems) {
      refetchItems()
    }
  }, [hasToRefetchChosenItems, refetchItems])
  
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
  }, [loadItems, isThresholdInView, paginationRef])

  return (
    <Loader isLoading={isLoadingData} isSuccess={isSuccessGetItems}>
      <Column ref={columnRef} className={styles.column}>
        <ColumnHeader>
          <FilterForm onSubmit={filterItems} />
        </ColumnHeader>

        {chosenItemsState.length ? (
          chosenItemsState.map((item) => (
          <Card 
            {...item} 
            key={item.id} 
            onChoose={removeItem}
            displayDelete
          />
        ))
        ) : (
          <Empty />
        )}

        {hasMore && <div ref={thresholdRef} />}
      </Column>
    </Loader>
  )
}
