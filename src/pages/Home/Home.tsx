import {
  useLazyGetUsersQuery,
  type GetUsersApiArg,
  type GetUsersByIdApiResponse,
} from '@/api'
import { Card } from '@/components/Card'
import { Column } from '@/components/Column'
import { Header } from '@/components/Header'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useInView } from 'react-intersection-observer'

import styles from './Home.module.css'
import { Loader } from '@/components/Loader'
import { useCallback, useEffect, useRef, useState } from 'react'
import { PAGINATION_DEFAULT, SCROLL_MARGIN } from './Home.config'
import { FilterForm } from '@/components/FilterForm'
import { AddUserForm } from '@/components/AddUserForm'

export const Home = () => {
  const { ref: thresholdRef, inView: isThresholdInView } = useInView({
    scrollMargin: SCROLL_MARGIN,
  })

  const [isLoadingData, setLoadingData] = useState(true)

  const [getUsers, { data }] = useLazyGetUsersQuery()

  const [users, setUsers] = useState<GetUsersByIdApiResponse[]>([])

  const { data: dataUsers } = data || {}

  const paginationRef = useRef(PAGINATION_DEFAULT)

  const filterUsers = useCallback(
    async (userIdFilter?: string) => {
      window.scrollTo({ top: 0, behavior: 'smooth' })

      setLoadingData(true)

      const response = await getUsers({ userIdFilter })

      if (response.data) {
        paginationRef.current = {
          ...response.data.pagination,
          offset: response.data.pagination.hasMore
            ? response.data.pagination.limit
            : paginationRef.current.offset,
        }

        setUsers(response.data.data)
      }

      setLoadingData(false)
    },
    [getUsers]
  )

  const loadUsers = useCallback(
    async (props: GetUsersApiArg = {}) => {
      setLoadingData(true)

      const response = await getUsers(props)

      if (response.data) {
        paginationRef.current = {
          ...response.data.pagination,
          offset: response.data.pagination.hasMore
            ? paginationRef.current.offset + response.data.pagination.limit
            : paginationRef.current.offset,
        }

        setUsers((prevUsers) => [...prevUsers, ...(response.data?.data || [])])
      }

      setLoadingData(false)
    },
    [getUsers]
  )

  const addUser = useCallback(
    async (userIdFilter?: string) => {
      console.log('add', userIdFilter)
    }, 
  [])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  useEffect(() => {
    if (!isThresholdInView || !paginationRef.current.hasMore) return

    loadUsers({
      offset: paginationRef.current.offset,
      userIdFilter: paginationRef.current.userIdFilter,
    })
  }, [loadUsers, isThresholdInView])

  return (
    <div className={styles.root}>
      <Header />

      <DndProvider backend={HTML5Backend}>
        <Loader isLoading={isLoadingData} isSuccess={!!dataUsers}>
          <main className={styles.main}>
            <Column>
              <FilterForm onSubmit={filterUsers} className={styles.filterForm} />

              {users?.map((user) => (
                <Card {...user} key={user.id} />
              ))}

              {data?.pagination.hasMore && <div ref={thresholdRef} />}

              <AddUserForm onSubmit={addUser} className={styles.addUserForm} />
            </Column>

            <Column>choisen</Column>
          </main>
        </Loader>
      </DndProvider>
    </div>
  )
}
