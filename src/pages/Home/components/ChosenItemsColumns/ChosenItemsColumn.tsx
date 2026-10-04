import { Card } from '@/components/Card'
import { Column } from '@/components/Column'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { FilterForm } from '@/pages/Home/components/FilterForm'
import type { UseGetItemsProps } from '../../Home.types'
import { useGetItems } from '../../hooks/useGetItems'
import type { FC } from 'react'
import { ColumnHeader } from '@/components/ColumnHeader'

export const ChosenItemsColumn: FC<UseGetItemsProps> = (props) => {
  const {
    hasMore,
  } = props

  const {
    thresholdRef,
    filterItems,
    items,
  } = useGetItems(props)

  return (
      <DndProvider backend={HTML5Backend}>
        <Column>
          <ColumnHeader>
            <FilterForm
              onSubmit={filterItems}
            />
          </ColumnHeader>

          {items.map((item) => (
            <Card 
              {...item} 
              key={item.id} 
            />
          ))}

          {hasMore && <div ref={thresholdRef} />}
        </Column>
      </DndProvider>
  )
}
