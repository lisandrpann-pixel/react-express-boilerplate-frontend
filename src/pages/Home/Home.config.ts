import type { GetUsersApiResponse } from '@/api'

export const SCROLL_MARGIN = '300px'

export const PAGINATION_DEFAULT = {
  offset: 0,
  hasMore: false,
} as GetUsersApiResponse['pagination']
