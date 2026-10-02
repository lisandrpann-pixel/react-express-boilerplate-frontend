import { memo, type FC } from 'react'
import type { CardProps } from './Card.types'
import styles from './Card.module.css'

export const Card: FC<CardProps> = memo(({ id }) => {
  return (
    <article className={styles.root}>
      <h3 className={styles.title}>
        <span className={styles.id}>{id}</span>
      </h3>
    </article>
  )
})
