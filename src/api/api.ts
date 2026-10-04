import { emptySplitApi as api } from './emptyApi'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getApiItems: build.query<GetApiItemsApiResponse, GetApiItemsApiArg>({
      query: (queryArg) => ({
        url: `/api/items`,
        params: {
          offset: queryArg.offset,
          limit: queryArg.limit,
          itemIdFilter: queryArg.itemIdFilter,
          isChosenFilter: queryArg.isChosenFilter,
        },
      }),
    }),
    postApiItems: build.mutation<PostApiItemsApiResponse, PostApiItemsApiArg>({
      query: (queryArg) => ({
        url: `/api/items`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    putApiItems: build.mutation<PutApiItemsApiResponse, PutApiItemsApiArg>({
      query: (queryArg) => ({
        url: `/api/items`,
        method: 'PUT',
        body: queryArg.body,
      }),
    }),
    getApiItemsById: build.query<
      GetApiItemsByIdApiResponse,
      GetApiItemsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/items/${queryArg.id}` }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as api }
export type GetApiItemsApiResponse = /** status 200 Страница пользователей */ {
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
    itemIdFilter?: string
    /** Возвращается только если фильтр задан */
    isChosenFilter?: boolean
  }
}
export type GetApiItemsApiArg = {
  /** Количество пропускаемых пользователей */
  offset?: number
  /** Максимальное количество пользователей в ответе */
  limit?: number
  /** Список id через запятую, где каждый элемент это либо одно значение, либо включительный диапазон from-to. Допустимые значения 5, 1-12, 1,2,12, 1,5-9,20. Значение 1 означает ровно id 1, а не все id содержащие 1. Формы можно смешивать в одном параметре. При отсутствии параметра фильтрация не применяется. Некорректное значение, в том числе обратный диапазон 5-1, приводит к ответу 400.
   */
  itemIdFilter?: string
  /** Признак, выбран ли пользователь или нет. Если isChosen true, возвращаются пользователи с isChosen=true, если false, возвращаются с isChosen=false, иначе возвращаются все пользователи. Ответ с учетом пагинации.
   */
  isChosenFilter?: boolean
}
export type PostApiItemsApiResponse = /** status 201 Пользователь создан */ {
  id: number
  isChosen: boolean
  order: number
}
export type PostApiItemsApiArg = {
  body: {
    /** Идентификатор пользователя, должен быть свободен */
    id: number
  }
}
export type PutApiItemsApiResponse = /** status 201 Пользователь изменён */ {
  id: number
  isChosen: boolean
  order: number
}
export type PutApiItemsApiArg = {
  body: {
    /** Идентификатор изменяемого пользователя */
    id: number
    /** Отмечен ли пользователь как выбранный */
    isChosen: boolean
    /** Новый порядковый номер пользователя */
    order: number
  }
}
export type GetApiItemsByIdApiResponse =
  /** status 200 Найденный пользователь */ {
    id: number
    isChosen: boolean
    order: number
  }
export type GetApiItemsByIdApiArg = {
  /** Идентификатор пользователя */
  id: number
}
export const {
  useGetApiItemsQuery,
  useLazyGetApiItemsQuery,
  usePostApiItemsMutation,
  usePutApiItemsMutation,
  useGetApiItemsByIdQuery,
  useLazyGetApiItemsByIdQuery,
} = injectedRtkApi
