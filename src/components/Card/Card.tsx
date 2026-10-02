import { memo, type FC } from 'react'
import type { CardProps } from './Card.types'
import styles from './Card.module.css'

import UncheckedIcon from '@/assets/unchecked.svg?react'
import { ICONS_SIZE } from '@/configs/layout.configs'

export const Card: FC<CardProps> = memo(({ id }) => {
  return (
    <article className={styles.root}>
      <UncheckedIcon className={styles.choose} {...ICONS_SIZE} />

      <span className={styles.id}>{id}</span>
    </article>
  )
})
