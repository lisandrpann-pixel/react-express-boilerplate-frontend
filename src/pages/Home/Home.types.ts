import type { GetApiUsersApiArg, GetApiUsersApiResponse } from "@/api"
import type { Action } from "@/types/common.types"

export interface UseGetUsersProps {
  getUsers: GetUsersType
  getUsersChosen?: GetUsersType
  switchOnLoader: Action
  switchOffLoader: Action
  isLoadingData: boolean
  hasMore?: boolean
}

export type GetUsersType = (args: GetApiUsersApiArg) => Promise<{ 
  data?: GetApiUsersApiResponse
}> 