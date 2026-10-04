import { Card } from '@/components/Card'
import { Column } from '@/components/Column'
import styles from './ItemsColumn.module.css'
import { FilterForm } from '../FilterForm'
import { AddItemForm } from '../AddItemForm'
import { useCallback, useEffect } from 'react'
import { ColumnHeader } from '@/components/ColumnHeader'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Empty } from '@/components/Empty'
import {
  useLazyGetApiItemsQuery,
  usePostApiItemsMutation,
  usePutApiItemsMutation,
  type GetApiItemsApiArg,
  type GetApiItemsByIdApiResponse,
} from '@/api'
import { PAGINATION_DEFAULT } from '../../Home.config'
import { toastSuccess } from '@/utils/notifications.utils'
import {
  addItemAction,
  chooseItemAction,
  filterItemsAction,
  loadItemsAction,
  selectItems,
} from '@/store/itemsState.slice'
import { Loader } from '@/components/Loader'
import { useItemsColumn } from '../../hooks/useItemsColumn'

export const ItemsColumn = () => {
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

  const [getItems, { data, isSuccess: isSuccessGetItems }] =
    useLazyGetApiItemsQuery()

  const hasMore = data?.pagination.hasMore

  const itemsState = useAppSelector(selectItems)

  const dispatch = useAppDispatch()

  const [createItem, { isLoading: isLoadingCreateItem }] =
    usePostApiItemsMutation()

  const [changeItem] = usePutApiItemsMutation()

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

        dispatch(filterItemsAction(response.data.data))
      }

      switchOffLoader()
    },
    [
      dispatch,
      getItems,
      paginationRef,
      scrollToTop,
      switchOffLoader,
      switchOnLoader,
    ]
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

        dispatch(loadItemsAction(response.data.data))
      }

      switchOffLoader()
    },
    [dispatch, getItems, paginationRef, switchOffLoader, switchOnLoader]
  )

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
        dispatch(chooseItemAction(chosenItem))

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

          dispatch(addItemAction(getItemsResponse.data.data))
        }

        toastSuccess(`Пользователь с id - ${itemId} успешно создан!`)
      }

      switchOffLoader()
    },
    [
      createItem,
      dispatch,
      getItems,
      paginationRef,
      scrollToTop,
      switchOffLoader,
      switchOnLoader,
    ]
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
  }, [loadItems, isThresholdInView, paginationRef])

  return (
    <Loader isLoading={isLoadingData} isSuccess={isSuccessGetItems}>
      <Column ref={columnRef} className={styles.column}>
        <ColumnHeader>
          <FilterForm
            onSubmit={filterItems}
            hasToCleanForm={isLoadingCreateItem}
          />
        </ColumnHeader>

        {itemsState.length ? (
          itemsState.map((item) => (
            <Card
              {...item}
              key={item.id}
              onChoose={chooseItem}
              displayChosen
            />
          ))
        ) : (
          <Empty />
        )}

        {hasMore && <div ref={thresholdRef} />}

        <AddItemForm onSubmit={addItem} className={styles.addItemForm} />
      </Column>
    </Loader>
  )
}
