import { Card } from '@/components/Card'
import { Column } from '@/components/Column'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import styles from './shared.module.css'
import { FilterForm } from '@/components/FilterForm'
import type { UseGetUsersProps } from '../Home.types'
import { useGetUsers } from '../hooks/useGetUsers'
import type { FC } from 'react'
import { ColumnHeader } from '@/components/ColumnHeader'

export const ChosenUsersColumn: FC<UseGetUsersProps> = (props) => {
  const {
    hasMore,
  } = props

  const {
    thresholdRef,
    filterUsers,
    users,
  } = useGetUsers(props)

  return (
      <DndProvider backend={HTML5Backend}>
        <Column>
          <ColumnHeader>
            <FilterForm
              onSubmit={filterUsers}
              className={styles.filterForm}
            />
          </ColumnHeader>

          {users.map((user) => (
            <Card 
              {...user} 
              key={user.id} 
            />
          ))}

          {hasMore && <div ref={thresholdRef} />}
        </Column>
      </DndProvider>
  )
}
