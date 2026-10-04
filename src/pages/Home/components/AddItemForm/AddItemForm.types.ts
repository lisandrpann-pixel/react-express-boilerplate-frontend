import type { ActionAsync } from '@/types/common.types'

export interface AddItemFormProps {
  onSubmit?: ActionAsync<string | undefined>
  className?: string
}
