import { memo, type FC } from "react"
import type { CardProps } from "./Card.types"
import styles from './Card.module.css'

export const Card: FC<CardProps> = memo(({
  name,
  index
}) => {
  return (
    <div className={styles.root}>
      <h4 className={styles.title}>{index + 1}. {name}</h4>
    </div>
  )
})
