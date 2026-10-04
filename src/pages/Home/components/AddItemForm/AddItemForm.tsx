import styles from './AddItemForm.module.css'
import SendIcon from '@/assets/send.svg?react'
import CloseIcon from '@/assets/close.svg?react'
import { memo, useState, type FC } from 'react'
import type { AddItemFormProps } from './AddItemForm.types'
import { ICONS_SIZE } from '@/configs/layout.configs'
import { Button } from '../../../../components/Button'
import { Input } from '../../../../components/Input'
import AddIcon from '@/assets/add.svg?react'
import classNames from 'classnames'

export const AddItemForm: FC<AddItemFormProps> = memo(
  ({ onSubmit, className }) => {
    const [formVisibility, setFormVisibility] = useState(false)

    const [itemId, setItemId] = useState('')

    const showForm = () => {
      setFormVisibility(true)
    }

    const submitForm = (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault()

      onSubmit?.(itemId)

      setItemId('')
    }

    const changeItemId = (
      e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>
    ) => {
      setItemId(e.target.value)
    }

    const closeForm = () => {
      setItemId('')
      setFormVisibility(false)
    }

    return (
      <form
        onSubmit={submitForm}
        className={classNames(styles.root, className)}
      >
        {formVisibility ? (
          <div className={styles.form}>
            <Input
              name="itemId"
              placeholder="Новый id"
              value={itemId}
              onChange={changeItemId}
            />

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
  }
)
