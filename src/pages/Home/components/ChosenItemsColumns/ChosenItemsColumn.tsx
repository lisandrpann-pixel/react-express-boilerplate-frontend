import { Card } from '@/components/Card'
import { Column } from '@/components/Column'
import { FilterForm } from '../FilterForm'
import { useCallback, useEffect } from 'react'
import { ColumnHeader } from '@/components/ColumnHeader'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Empty } from '@/components/Empty'
import { useLazyGetApiItemsQuery, type GetApiItemsApiArg } from '@/api'
import { PAGINATION_DEFAULT } from '../../Home.config'
import { Loader } from '@/components/Loader'
import { useItemsColumn } from '../../hooks/useItemsColumn'
import styles from './ChosenItemsColumn.module.css'
import {
  filterChosenItemsAction,
  loadChosenItemsAction,
  selectChosenItems,
} from '@/store/chosenItemsState.slice'

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
          chosenItemsState.map((item) => <Card {...item} key={item.id} />)
        ) : (
          <Empty />
        )}

        {hasMore && <div ref={thresholdRef} />}
      </Column>
    </Loader>
  )
}
