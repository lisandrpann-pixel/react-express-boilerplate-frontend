import { emptySplitApi as api } from './emptyApi'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getApiUsers: build.query<GetApiUsersApiResponse, GetApiUsersApiArg>({
      query: (queryArg) => ({
        url: `/api/users`,
        params: {
          offset: queryArg.offset,
          limit: queryArg.limit,
          userIdFilter: queryArg.userIdFilter,
          isChosenFilter: queryArg.isChosenFilter,
        },
      }),
    }),
    postApiUsers: build.mutation<PostApiUsersApiResponse, PostApiUsersApiArg>({
      query: (queryArg) => ({
        url: `/api/users`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    putApiUsers: build.mutation<PutApiUsersApiResponse, PutApiUsersApiArg>({
      query: (queryArg) => ({
        url: `/api/users`,
        method: 'PUT',
        body: queryArg.body,
      }),
    }),
    getApiUsersById: build.query<
      GetApiUsersByIdApiResponse,
      GetApiUsersByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/users/${queryArg.id}` }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as api }
export type GetApiUsersApiResponse = /** status 200 Страница пользователей */ {
  data: {
    id: number
    /** Отмечен ли пользователь как выбранный */
    isChosen: boolean
    /** Порядковый номер пользователя */
    order: number
  }[]
  pagination: {
    offset: number
    limit: number
    /** Количество пользователей после фильтрации */
    total: number
    hasMore: boolean
    /** Возвращается только если фильтр задан */
    userIdFilter?: string
    /** Возвращается только если фильтр задан */
    isChosenFilter?: boolean
  }
}
export type GetApiUsersApiArg = {
  /** Количество пропускаемых пользователей */
  offset?: number
  /** Максимальное количество пользователей в ответе */
  limit?: number
  /** Список id через запятую, где каждый элемент это либо одно значение, либо включительный диапазон from-to. Допустимые значения 5, 1-12, 1,2,12, 1,5-9,20. Значение 1 означает ровно id 1, а не все id содержащие 1. Формы можно смешивать в одном параметре. При отсутствии параметра фильтрация не применяется. Некорректное значение, в том числе обратный диапазон 5-1, приводит к ответу 400.
   */
  userIdFilter?: string
  /** Признак, выбран ли пользователь или нет. Если isChosen true, возвращаются пользователи с isChosen=true, если false, возвращаются с isChosen=false, иначе возвращаются все пользователи. Ответ с учетом пагинации.
   */
  isChosenFilter?: boolean
}
export type PostApiUsersApiResponse = /** status 201 Пользователь создан */ {
  id: number
  isChosen: boolean
  order: number
}
export type PostApiUsersApiArg = {
  body: {
    /** Идентификатор пользователя, должен быть свободен */
    id: number
  }
}
export type PutApiUsersApiResponse = /** status 201 Пользователь изменён */ {
  id: number
  isChosen: boolean
  order: number
}
export type PutApiUsersApiArg = {
  body: {
    /** Идентификатор изменяемого пользователя */
    id: number
    /** Отмечен ли пользователь как выбранный */
    isChosen: boolean
    /** Новый порядковый номер пользователя */
    order: number
  }
}
export type GetApiUsersByIdApiResponse =
  /** status 200 Найденный пользователь */ {
    id: number
    isChosen: boolean
    order: number
  }
export type GetApiUsersByIdApiArg = {
  /** Идентификатор пользователя */
  id: number
}
export const {
  useGetApiUsersQuery,
  useLazyGetApiUsersQuery,
  usePostApiUsersMutation,
  usePutApiUsersMutation,
  useGetApiUsersByIdQuery,
  useLazyGetApiUsersByIdQuery,
} = injectedRtkApi
