import type { ActionAsync } from '@/types/common.types'

export interface AddUserFormProps {
  onSubmit?: ActionAsync<string | undefined>
  className?: string
}
