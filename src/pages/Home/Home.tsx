import {
  useLazyGetApiUsersQuery,
  usePostApiUsersMutation,
  usePutApiUsersMutation,
  type GetApiUsersApiArg,
  type GetApiUsersByIdApiResponse,
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
import { PAGINATION_DEFAULT, ROOT_MARGIN } from './Home.config'
import { FilterForm } from '@/components/FilterForm'
import { AddUserForm } from '@/components/AddUserForm'
import { scrollToTop } from '@/utils/common.utils'
import { toastSuccess } from '@/utils/notifications.utils'

export const Home = () => {
  const [createUser, { isLoading: isLoadingCreateUser }] =
    usePostApiUsersMutation()

  const [changeUser] = usePutApiUsersMutation()

  const [choosenUsers, setChoosenUsers] = useState<
    GetApiUsersByIdApiResponse[]
  >([])

  const [isLoadingData, setLoadingData] = useState(true)

  const { ref: thresholdRef, inView: isThresholdInView } = useInView({
    rootMargin: ROOT_MARGIN,
    skip: isLoadingData,
  })

  const [getUsers, { data }] = useLazyGetApiUsersQuery()

  const [users, setUsers] = useState<GetApiUsersByIdApiResponse[]>([])

  const { data: dataUsers } = data || {}

  const paginationRef = useRef(PAGINATION_DEFAULT)

  const chooseUser = useCallback(
    async (user: GetApiUsersByIdApiResponse) => {
      setLoadingData(true)

      const changeUserResponse = await changeUser({
        body: {
          ...user,
          isChosen: user.isChosen ? false : true,
        },
      })

      if (changeUserResponse.data) {
        const getUsersResponse = await getUsers({})

        if (getUsersResponse.data) {
          paginationRef.current = {
            ...getUsersResponse.data.pagination,
            offset: PAGINATION_DEFAULT.limit,
          }

          setUsers(getUsersResponse.data.data)
        }
      }

      setLoadingData(false)
    },
    [changeUser, getUsers]
  )

  const filterUsers = useCallback(
    async (userIdFilter?: string) => {
      scrollToTop()

      setLoadingData(true)

      const response = await getUsers({ userIdFilter })

      if (response.data) {
        paginationRef.current = {
          ...response.data.pagination,
          offset: PAGINATION_DEFAULT.limit,
        }

        setUsers(response.data.data)
      }

      setLoadingData(false)
    },
    [getUsers]
  )

  const loadUsers = useCallback(
    async (props: GetApiUsersApiArg = {}) => {
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
    async (userId?: string) => {
      setLoadingData(true)

      scrollToTop()

      const createUserResponse = await createUser({
        body: { id: Number(userId) },
      })

      if (createUserResponse.data) {
        const getUsersResponse = await getUsers({})

        if (getUsersResponse.data) {
          paginationRef.current = {
            ...getUsersResponse.data.pagination,
            offset: PAGINATION_DEFAULT.limit,
          }

          setUsers(getUsersResponse.data.data)
        }
      }

      setLoadingData(false)

      toastSuccess(`Пользователь с id - ${userId} успешно создан!`)
    },
    [createUser, getUsers]
  )

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  useEffect(() => {
    if (isThresholdInView && paginationRef.current.hasMore) {
      loadUsers({
        offset: paginationRef.current.offset,
        userIdFilter: paginationRef.current.userIdFilter,
      })
    }
  }, [loadUsers, isThresholdInView])

  return (
    <div className={styles.root}>
      <Header />

      <DndProvider backend={HTML5Backend}>
        <Loader isLoading={isLoadingData} isSuccess={!!dataUsers}>
          <main className={styles.main}>
            <Column>
              <FilterForm
                onSubmit={filterUsers}
                className={styles.filterForm}
                hasToCleanForm={isLoadingCreateUser}
              />

              {users.map((user) => (
                <Card {...user} key={user.id} onChoose={chooseUser} />
              ))}

              {data?.pagination.hasMore && <div ref={thresholdRef} />}

              <AddUserForm onSubmit={addUser} className={styles.addUserForm} />
            </Column>

            <Column>
              {choosenUsers.map((user) => (
                <Card {...user} key={user.id} />
              ))}
            </Column>
          </main>
        </Loader>
      </DndProvider>
    </div>
  )
}
