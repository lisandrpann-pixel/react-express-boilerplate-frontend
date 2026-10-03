import type { GetApiUsersApiArg, GetApiUsersApiResponse } from "@/api"
import type { Action } from "@/types/common.types"

export interface UseGetUsersProps {
  getUsers: (args: GetApiUsersApiArg) => Promise<{ 
    data?: GetApiUsersApiResponse
  }> 
  switchOnLoader: Action
  switchOffLoader: Action
  isLoadingData: boolean
  hasMore?: boolean
}