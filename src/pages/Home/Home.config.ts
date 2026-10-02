import type { GetApiUsersApiResponse } from '@/api'

export const ROOT_MARGIN = '300px'

export const PAGINATION_DEFAULT = {
  offset: 0,
  hasMore: false,
  limit: 20,
} as GetApiUsersApiResponse['pagination']
