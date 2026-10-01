import { useLazyGetUsersQuery, type GetUsersApiArg, type GetUsersByIdApiResponse } from '@/api'
import { Card } from '@/components/Card'
import { Column } from '@/components/Column'
import { Header } from '@/components/Header'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useInView } from "react-intersection-observer"

import styles from './Home.module.css'
import { Loader } from '@/components/Loader'
import { useCallback, useEffect, useRef, useState } from 'react'
import { SCROLL_MARGIN } from './Home.config'
import { FilterForm } from '@/components/FilterForm'

export const Home = () => {
  const { ref: thresholdRef, inView: isThresholdInView } = useInView({
    scrollMargin: SCROLL_MARGIN
  })

  const [isLoadingData, setLoadingData] = useState(true)

  const [getUsers, { data }] = useLazyGetUsersQuery()

  const [users, setUsers] = useState<GetUsersByIdApiResponse[]>([])

  const { data: dataUsers, pagination } = data || {}

  const paginationLimit = pagination?.limit || 0

  const paginationHasMore = pagination?.hasMore || false

  const paginationOffsetRef = useRef(0)

  const paginationHasMoreRef = useRef(false)

  const loadUsers = useCallback(async (props: GetUsersApiArg = {}) => {
    setLoadingData(true)

    await getUsers(props)

    setLoadingData(false)
  }, [getUsers])

  const filterUsersById = (userId: string) => {
    console.log(userId)
  }

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  useEffect(() => {
    if (!isThresholdInView || !paginationHasMoreRef.current) return

    loadUsers({
      offset: paginationOffsetRef.current,
    })
  }, [loadUsers, isThresholdInView])

  useEffect(() => {
    paginationOffsetRef.current += paginationLimit
    paginationHasMoreRef.current = paginationHasMore

    setUsers((prevUsers) => [
      ...prevUsers,
      ...(dataUsers || []),
    ])
  }, [dataUsers, paginationHasMore, paginationLimit])

  return (
    <div className={styles.root}>
      <Header />

      <DndProvider backend={HTML5Backend}>
        <Loader isLoading={isLoadingData} isSuccess={!!dataUsers}>
          <main className={styles.main}>
            <Column>
              <FilterForm onSubmit={filterUsersById} />

              {users?.map((user) => (
                <Card {...user} key={`${user.index}-${user._id}`} />
              ))}

              <div ref={thresholdRef} />
            </Column>

            <Column>
              choisen
            </Column>
          </main>
        </Loader>
      </DndProvider>
    </div>
  )
}