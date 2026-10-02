import type { PropsWithChildren } from 'react'

export interface LoaderProps extends PropsWithChildren {
  isLoading?: boolean
  isSuccess?: boolean
}
