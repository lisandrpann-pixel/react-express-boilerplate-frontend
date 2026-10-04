import type { GetApiItemsByIdApiResponse } from '@/api'
import type { ActionAsync } from '@/types/common.types'

export interface CardProps extends GetApiItemsByIdApiResponse {
  onChoose?: ActionAsync<GetApiItemsByIdApiResponse>
  displayChosen?: boolean
  displayDelete?: boolean
}
