import {
  usePostApiUsersMutation,
  usePutApiUsersMutation,
  type GetApiUsersApiArg,
  type GetApiUsersByIdApiResponse,
} from '@/api'

import { useInView } from 'react-intersection-observer'

import { useCallback, useEffect, useRef, useState } from 'react'
import { PAGINATION_DEFAULT, ROOT_MARGIN } from './Home.config'
import { scrollToTop } from '@/utils/common.utils'
import { toastSuccess } from '@/utils/notifications.utils'
import type { UseGetUsersProps } from './Home.types'

export const useGetUsers = ({
  getUsers,
  switchOffLoader,
  switchOnLoader,
  isLoadingData,
}: UseGetUsersProps) => {
  const [createUser, { isLoading: isLoadingCreateUser }] =
    usePostApiUsersMutation()

  const [changeUser] = usePutApiUsersMutation()

  const { ref: thresholdRef, inView: isThresholdInView } = useInView({
    rootMargin: ROOT_MARGIN,
    skip: isLoadingData,
  })

  const [users, setUsers] = useState<GetApiUsersByIdApiResponse[]>([])

  const paginationRef = useRef(PAGINATION_DEFAULT)

  const chooseUser = useCallback(
    async (chosenUser: GetApiUsersByIdApiResponse) => {
      switchOnLoader()

      const changeUserResponse = await changeUser({
        body: {
          ...chosenUser,
          isChosen: !chosenUser.isChosen,
        },
      })

      if (changeUserResponse.data) {
        setUsers((prevUsers) => prevUsers.map((user) => 
          user.id === chosenUser.id 
            ? {
              ...user,
              isChosen: !user.isChosen
            } 
            : user
        ))

        // const getUsersResponse = await getUsers({})

        // if (getUsersResponse.data) {
        //   paginationRef.current = {
        //     ...getUsersResponse.data.pagination,
        //     offset: PAGINATION_DEFAULT.limit,
        //   }

        //   setUsers(getUsersResponse.data.data)
        // }
      }

      switchOffLoader()
    },
    [changeUser, switchOffLoader, switchOnLoader]
  )

  const filterUsers = useCallback(
    async (userIdFilter?: string) => {
      scrollToTop()

      switchOnLoader()

      const response = await getUsers({ userIdFilter })

      if (response.data) {
        paginationRef.current = {
          ...response.data.pagination,
          offset: PAGINATION_DEFAULT.limit,
        }

        setUsers(response.data.data)
      }

      switchOffLoader()
    },
    [getUsers, switchOffLoader, switchOnLoader]
  )

  const loadUsers = useCallback(
    async (props: GetApiUsersApiArg = {}) => {
      switchOnLoader()

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

      switchOffLoader()
    },
    [getUsers, switchOffLoader, switchOnLoader]
  )

  const addUser = useCallback(
    async (userId?: string) => {
      switchOnLoader()

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

      switchOffLoader()

      toastSuccess(`Пользователь с id - ${userId} успешно создан!`)
    },
    [createUser, getUsers, switchOffLoader, switchOnLoader]
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

  return {
    thresholdRef,
    chooseUser,
    filterUsers,
    addUser,
    users,
    isLoadingCreateUser,
  }
}
