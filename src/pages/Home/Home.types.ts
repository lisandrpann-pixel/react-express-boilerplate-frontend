import type { GetApiItemsApiArg, GetApiItemsApiResponse } from "@/api"
import type { Action } from "@/types/common.types"

export interface UseGetItemsProps {
  getItems: GetItemsType
  switchOnLoader: Action
  switchOffLoader: Action
  isLoadingData: boolean
  hasMore?: boolean
}

export type GetItemsType = (args: GetApiItemsApiArg) => Promise<{ 
  data?: GetApiItemsApiResponse
}> 