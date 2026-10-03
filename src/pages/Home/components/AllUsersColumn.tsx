import { Card } from '@/components/Card'
import { Column } from '@/components/Column'

import styles from './shared.module.css'
import { FilterForm } from '@/components/FilterForm'
import { AddUserForm } from '@/components/AddUserForm'
import type { UseGetUsersProps } from '../Home.types'
import { useGetUsers } from '../hooks/useGetUsers'
import type { FC } from 'react'
import { ColumnHeader } from '@/components/ColumnHeader'

export const AllUsersColumn: FC<UseGetUsersProps> = (props) => {
  const {
    hasMore,
  } = props

  const {
    thresholdRef,
    chooseUser,
    filterUsers,
    addUser,
    users,
    isLoadingCreateUser,
  } = useGetUsers(props)

  return (
    <Column>
      <ColumnHeader>
        <FilterForm
          onSubmit={filterUsers}
          className={styles.filterForm}
          hasToCleanForm={isLoadingCreateUser}
        />
      </ColumnHeader>

      {users.map((user) => (
        <Card 
          {...user} 
          key={user.id} 
          onChoose={chooseUser} 
          isChosen={user.isChosen}
          displayChosen
        />
      ))}

      {hasMore && <div ref={thresholdRef} />}

      <AddUserForm onSubmit={addUser} className={styles.addUserForm} />
    </Column>
  )
}
