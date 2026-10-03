import { memo, type FC } from 'react'
import type { CardProps } from './Card.types'
import styles from './Card.module.css'

import UncheckedIcon from '@/assets/unchecked.svg?react'
import CheckedIcon from '@/assets/checked.svg?react'
import { ICONS_SIZE } from '@/configs/layout.configs'

export const Card: FC<CardProps> = memo((props) => {
  const { id, isChosen, onChoose, displayChosen } = props

  const Chechbox = isChosen ? CheckedIcon : UncheckedIcon

  return (
    <article className={styles.root}>
      {displayChosen && (
        <Chechbox 
          className={isChosen ? styles.checked : styles.unchecked}
          {...ICONS_SIZE}
          onClick={() => onChoose?.(props)}
        />
      )}

      <span className={styles.id}>{id}</span>
    </article>
  )
})
