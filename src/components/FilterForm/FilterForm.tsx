import styles from './FilterForm.module.css'
import SearchIcon from '@/assets/search.svg?react'
import ResetIcon from '@/assets/reset.svg?react'
import { useState, type FC } from 'react'
import type { FilterFormProps } from './FilterForm.types'

export const FilterForm: FC<FilterFormProps> = ({ onSubmit }) => {
  const [userId, setUserId] = useState('')

  const filterUsersById = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    onSubmit?.(userId)
  }

  const changeUserIdFilter = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setUserId(e.target.value)
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
        <SearchIcon width={24} height={24} />
      </button>

      <button
        className={styles.button}
      >
        <ResetIcon width={24} height={24} />
      </button>
    </form>
  )
}