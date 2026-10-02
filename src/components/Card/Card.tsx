import { memo, type FC } from "react"
import type { CardProps } from "./Card.types"
import styles from './Card.module.css'

export const Card: FC<CardProps> = memo(({
  name,
  index,
  _id,
}) => {
  return (
    <article className={styles.root}>
      <h3 className={styles.title}>{index + 1}. {name}</h3>
      <div className={styles.id}>{_id}</div>
    </article>
  )
})
