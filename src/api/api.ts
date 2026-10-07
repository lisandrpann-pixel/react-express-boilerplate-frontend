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
        headers: {
          'Idempotency-Key': queryArg['Idempotency-Key'],
        },
      }),
    }),
    putApiItems: build.mutation<PutApiItemsApiResponse, PutApiItemsApiArg>({
      query: (queryArg) => ({
        url: `/api/items`,
        method: 'PUT',
        body: queryArg.body,
        headers: {
          'Idempotency-Key': queryArg['Idempotency-Key'],
        },
      }),
    }),
    getApiItemsById: build.query<
      GetApiItemsByIdApiResponse,
      GetApiItemsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/items/${queryArg.id}` }),
    }),
    getApiItemsEvents: build.query<
      GetApiItemsEventsApiResponse,
      GetApiItemsEventsApiArg
    >({
      query: () => ({ url: `/api/items/events` }),
    }),
    getHealth: build.query<GetHealthApiResponse, GetHealthApiArg>({
      query: () => ({ url: `/health` }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as api }
export type GetApiItemsApiResponse = /** status 200 Страница элементов */ {
  data: {
    id: number
    /** Отмечен ли элемент как выбранный */
    isChosen: boolean
    /** Порядковый номер элемента */
    order: number
  }[]
  pagination: {
    offset: number
    limit: number
    /** Количество элементов после фильтрации */
    total: number
    hasMore: boolean
    /** Возвращается только если фильтр задан */
    itemIdFilter?: string
    /** Возвращается только если фильтр задан */
    isChosenFilter?: boolean
  }
}
export type GetApiItemsApiArg = {
  /** Количество пропускаемых элементов */
  offset?: number
  /** Максимальное количество элементов в ответе */
  limit?: number
  /** Список id через запятую, где каждый элемент это либо одно значение, либо включительный диапазон from-to. Допустимые значения 5, 1-12, 1,2,12, 1,5-9,20. Значение 1 означает ровно id 1, а не все id содержащие 1. Формы можно смешивать в одном параметре. При отсутствии параметра фильтрация не применяется. Некорректное значение, в том числе обратный диапазон 5-1, приводит к ответу 400.
   */
  itemIdFilter?: string
  /** Признак, выбран ли элемент или нет. Если isChosen true, возвращаются элементы с isChosen=true, если false, возвращаются с isChosen=false, иначе возвращаются все элементы. Ответ с учетом пагинации.
   */
  isChosenFilter?: boolean
}
export type PostApiItemsApiResponse =
  /** status 202 Элемент принят и поставлен в очередь. Он появится в GET после следующей разгрузки — не позднее 10 секунд
   */ {
    id: number
    isChosen: boolean
    order: number
    /** Элемент ещё не применён, лежит в буфере. Поля итоговые, клиент уже видит будущий результат
     */
    status: 'queued'
  }
export type PostApiItemsApiArg = {
  /** Ключ идемпотентности операции. Один ключ — одна операция: при повторах клиент переиспользует то же значение и получает тот же ответ, а работа выполняется один раз. Без заголовка запросы с одинаковым телом склеиваются, но только пока первый ещё выполняется. Тот же ключ с другим телом отклоняется.
   */
  'Idempotency-Key'?: string
  body: {
    /** Идентификатор элемента, должен быть свободен */
    id: number
  }
}
export type PutApiItemsApiResponse = /** status 200 Элемент изменён */ {
  id: number
  isChosen: boolean
  order: number
}
export type PutApiItemsApiArg = {
  /** Ключ идемпотентности операции. Один ключ — одна операция: при повторах клиент переиспользует то же значение и получает тот же ответ, а работа выполняется один раз. Без заголовка запросы с одинаковым телом склеиваются, но только пока первый ещё выполняется. Тот же ключ с другим телом отклоняется.
   */
  'Idempotency-Key'?: string
  body: {
    /** Идентификатор изменяемого элемента */
    id: number
    /** Отмечен ли элемент как выбранный */
    isChosen: boolean
    /** Новый порядковый номер элемента */
    order: number
  }
}
export type GetApiItemsByIdApiResponse = /** status 200 Найденный элемент */ {
  id: number
  isChosen: boolean
  order: number
}
export type GetApiItemsByIdApiArg = {
  /** Идентификатор элемента */
  id: number
}
export type GetApiItemsEventsApiResponse = /** status 200 Поток открыт */ string
export type GetApiItemsEventsApiArg = void
export type GetHealthApiResponse =
  /** status 200 Процесс жив и готов принимать трафик */ {
    status: string
    /** Сколько секунд процесс работает */
    uptime: number
  }
export type GetHealthApiArg = void
export const {
  useGetApiItemsQuery,
  useLazyGetApiItemsQuery,
  usePostApiItemsMutation,
  usePutApiItemsMutation,
  useGetApiItemsByIdQuery,
  useLazyGetApiItemsByIdQuery,
  useGetApiItemsEventsQuery,
  useLazyGetApiItemsEventsQuery,
  useGetHealthQuery,
  useLazyGetHealthQuery,
} = injectedRtkApi
