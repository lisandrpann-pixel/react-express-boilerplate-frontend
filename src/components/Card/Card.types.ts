import type { GetApiUsersByIdApiResponse } from '@/api'
import type { ActionAsync } from '@/types/common.types'

export interface CardProps extends GetApiUsersByIdApiResponse {
  onChoose?: ActionAsync<GetApiUsersByIdApiResponse>
  displayChosen?: boolean
}
