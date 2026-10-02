import type { ActionAsync } from "@/types/common.types"

export interface FilterFormProps {
    onSubmit?: ActionAsync<string | undefined>
}