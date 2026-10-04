import { memo, type FC } from 'react'
import type { CardProps } from './Card.types'
import styles from './Card.module.css'
import UncheckedIcon from '@/assets/unchecked.svg?react'
import CheckedIcon from '@/assets/checked.svg?react'
import DeleteIcon from '@/assets/delete.svg?react'
import { ICONS_SIZE } from '@/configs/layout.configs'

export const Card: FC<CardProps> = memo((props) => {
  const { id, isChosen, onChoose, displayChosen, displayDelete, order } = props

  const Chechbox = isChosen ? CheckedIcon : UncheckedIcon

  const chooseItem = () => onChoose?.({ 
    id,
    isChosen,
    order,
  })

  return (
    <article className={styles.root}>
      {displayChosen && (
        <Chechbox
          className={isChosen ? styles.checked : styles.unchecked}
          {...ICONS_SIZE}
          onClick={chooseItem}
        />
      )}

      {isChosen && displayDelete && (
        <DeleteIcon
          {...ICONS_SIZE}
          className={styles.delete}
          onClick={chooseItem}
        />
      )}

      <span className={styles.id}>{id}</span>
    </article>
  )
})
