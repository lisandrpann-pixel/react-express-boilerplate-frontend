import type { GetApiItemsApiResponse } from '@/api'

export const ROOT_MARGIN = '300px'

export const PAGINATION_DEFAULT = {
  offset: 0,
  hasMore: false,
  limit: 20,
} as GetApiItemsApiResponse['pagination']
