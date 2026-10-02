import styles from './FilterForm.module.css'
import SearchIcon from '@/assets/search.svg?react'
import ResetIcon from '@/assets/reset.svg?react'
import { useState, type FC } from 'react'
import type { FilterFormProps } from './FilterForm.types'
import { ICONS_SIZE } from './FilterForm.config'

export const FilterForm: FC<FilterFormProps> = ({ onSubmit }) => {
  const [userId, setUserId] = useState('')

  const filterUsersById = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    onSubmit?.(userId)
  }

  const changeUserIdFilter = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setUserId(e.target.value)
  }

  const resetFilter = () => {
    setUserId('')
    onSubmit?.(undefined)
  }

  return (
    <form onSubmit={filterUsersById} className={styles.filter}>
      <input 
        name="filterById" 
        value={userId} 
        onChange={changeUserIdFilter}
        className={styles.input}
      />

      <button 
        type="submit"
        className={styles.button}
      >
        <SearchIcon {...ICONS_SIZE} />
      </button>

      <button
        type="button"
        className={styles.button}
        onClick={resetFilter}
      >
        <ResetIcon {...ICONS_SIZE} />
      </button>
    </form>
  )
}