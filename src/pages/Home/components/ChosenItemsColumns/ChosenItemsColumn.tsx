import { Card } from '@/components/Card'
import { Column } from '@/components/Column'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { FilterForm } from '@/pages/Home/components/FilterForm'
import type { UseGetItemsProps } from '../../Home.types'
import { useGetItems } from '../../hooks/useGetItems'
import type { FC } from 'react'
import { ColumnHeader } from '@/components/ColumnHeader'
import { useAppSelector } from '@/store/hooks'
import { Empty } from '@/components/Empty'

export const ChosenItemsColumn: FC<UseGetItemsProps> = (props) => {
  const {
    hasMore,
  } = props

  const chosenItemsState = useAppSelector(state => state.chosenItemsState.value)

  const {
    thresholdRef,
    filterItems,
    items,
  } = useGetItems(props, chosenItemsState)

  return (
      <DndProvider backend={HTML5Backend}>
        <Column>
          <ColumnHeader>
            <FilterForm
              onSubmit={filterItems}
            />
          </ColumnHeader>

          {items.length 
            ? items.map((item) => (
              <Card 
                {...item} 
                key={item.id} 
              />
            ))
            : (
              <Empty>Пока не добавлено ни одной записи</Empty>
            )}

          {hasMore && <div ref={thresholdRef} />}
        </Column>
      </DndProvider>
  )
}
