import { Card } from '@/components/Card'
import { Column } from '@/components/Column'

import styles from './ItemsColumn.module.css'
import { FilterForm } from '../FilterForm'
import { AddItemForm } from '../AddItemForm'
import type { UseGetItemsProps } from '../../Home.types'
import { useGetItems } from '../../hooks/useGetItems'
import type { FC } from 'react'
import { ColumnHeader } from '@/components/ColumnHeader'

export const AllItemsColumn: FC<UseGetItemsProps> = (props) => {
  const {
    hasMore,
  } = props

  const {
    thresholdRef,
    chooseItem,
    filterItems,
    addItem,
    items,
    isLoadingCreateItem,
  } = useGetItems(props)

  return (
    <Column>
      <ColumnHeader>
        <FilterForm
          onSubmit={filterItems}
          hasToCleanForm={isLoadingCreateItem}
        />
      </ColumnHeader>

      {items.map((item) => (
        <Card 
          {...item} 
          key={item.id} 
          onChoose={chooseItem} 
          isChosen={item.isChosen}
          displayChosen
        />
      ))}

      {hasMore && <div ref={thresholdRef} />}

      <AddItemForm onSubmit={addItem} className={styles.addItemForm} />
    </Column>
  )
}
