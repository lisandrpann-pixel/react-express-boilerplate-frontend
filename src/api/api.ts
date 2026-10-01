import { emptySplitApi as api } from './emptyApi'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<GetUsersApiResponse, GetUsersApiArg>({
      query: (queryArg) => ({
        url: `/users`,
        params: {
          offset: queryArg.offset,
          limit: queryArg.limit,
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
    _id: string
    index: number
    name: string
  }[]
  pagination: {
    offset: number
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
}
export type GetUsersByIdApiResponse = /** status 200 Найденный пользователь */ {
  _id: string
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
