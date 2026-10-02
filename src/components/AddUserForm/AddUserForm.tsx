import styles from './AddUserForm.module.css'
import SendIcon from '@/assets/send.svg?react'
import CloseIcon from '@/assets/close.svg?react'
import { memo, useState, type FC } from 'react'
import type { AddUserFormProps } from './AddUserForm.types'
import { ICONS_SIZE } from '@/configs/layout.configs'
import { Button } from '../Button'
import { Input } from '../Input'
import AddIcon from '@/assets/add.svg?react'
import classNames from 'classnames'

export const AddUserForm: FC<AddUserFormProps> = memo(({ onSubmit, className }) => {
  const [formVisibility, setFormVisibility] = useState(false)
  
  const [userId, setUserId] = useState('')

  const showForm = () => {
    setFormVisibility(true)
  }

  const submitForm = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    onSubmit?.(userId)

    setUserId('')
  }

  const changeUserId = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) => {
    setUserId(e.target.value)
  }

  const closeForm = () => {
    setUserId('')
    setFormVisibility(false)
  }

  return (
    <form onSubmit={submitForm} className={classNames(styles.root, className)}>
      {formVisibility ? (
        <div className={styles.form}>
          <Input name="filterById" value={userId} onChange={changeUserId} />

          <Button type="submit">
            <SendIcon {...ICONS_SIZE} />
          </Button>

          <Button type="button" onClick={closeForm}>
            <CloseIcon {...ICONS_SIZE} />
          </Button>
        </div>
      ) : (
        <div className={styles.showFormButtonContainer}>
          <Button
            className={styles.showFormButton}
            viewType="circle"
            onClick={showForm}
          >
            <AddIcon {...ICONS_SIZE} />
          </Button>
        </div>
      )}
    </form>
  )
})
