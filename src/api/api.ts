import { emptySplitApi as api } from './emptyApi'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<GetUsersApiResponse, GetUsersApiArg>({
      query: (queryArg) => ({
        url: `/users`,
        params: {
          offset: queryArg.offset,
          limit: queryArg.limit,
          userIdFilter: queryArg.userIdFilter,
        },
      }),
    }),
    getUsersById: build.query<GetUsersByIdApiResponse, GetUsersByIdApiArg>({
      query: (queryArg) => ({ url: `/users/${queryArg.id}` }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as api }
export type GetUsersApiResponse = /** status 200 Страница пользователей */ {
  data: {
    id: string
    index: number
    name: string
  }[]
  pagination: {
    offset: number
    userIdFilter?: string
    limit: number
    total: number
    hasMore: boolean
  }
}
export type GetUsersApiArg = {
  /** Количество пропускаемых пользователей */
  offset?: number
  /** Максимальное количество пользователей в ответе */
  limit?: number
  /** Фильтр по id пользователя */
  userIdFilter?: string
}
export type GetUsersByIdApiResponse = /** status 200 Найденный пользователь */ {
  id: string
  index: number
  name: string
}
export type GetUsersByIdApiArg = {
  /** Идентификатор пользователя */
  id: string
}
export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useGetUsersByIdQuery,
  useLazyGetUsersByIdQuery,
} = injectedRtkApi
