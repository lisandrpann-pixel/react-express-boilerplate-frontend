import styles from './FilterForm.module.css'
import SearchIcon from '@/assets/search.svg?react'
import ResetIcon from '@/assets/reset.svg?react'
import { memo, useEffect, useState, type FC } from 'react'
import type { FilterFormProps } from './FilterForm.types'
import { ICONS_SIZE } from '@/configs/layout.configs'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import classNames from 'classnames'

export const FilterForm: FC<FilterFormProps> = memo(
  ({ onSubmit, className, hasToCleanForm }) => {
    const [itemId, setItemId] = useState('')

    const submitForm = (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault()

      onSubmit?.(itemId)
    }

    const changeItemId = (
      e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>
    ) => {
      setItemId(e.target.value)
    }

    const resetForm = () => {
      setItemId('')
      onSubmit?.(undefined)
    }

    useEffect(() => {
      if (hasToCleanForm) {
        setItemId('')
      }
    }, [hasToCleanForm])

    return (
      <form
        onSubmit={submitForm}
        className={classNames(styles.root, className)}
      >
        <Input
          name="filterById"
          placeholder="id, диапазон ids: 1-12, список ids: 1,2,12"
          value={itemId}
          onChange={changeItemId}
        />

        <Button type="submit">
          <SearchIcon {...ICONS_SIZE} />
        </Button>

        <Button type="button" onClick={resetForm}>
          <ResetIcon {...ICONS_SIZE} />
        </Button>
      </form>
    )
  }
)
