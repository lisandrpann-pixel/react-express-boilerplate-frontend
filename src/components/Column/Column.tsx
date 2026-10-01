import { memo, type FC } from "react"
import type { ColumnProps } from "./Column.types"
import styles from './Column.module.css'

export const Column: FC<ColumnProps> = memo(({
  children
}) => {
  return (
    <div className={styles.root}>
      {children}
    </div>
  )
})
