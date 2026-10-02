import { type FC } from 'react'
import type { ColumnProps } from './Column.types'
import styles from './Column.module.css'

export const Column: FC<ColumnProps> = ({ children }) => {
  return <div className={styles.root}>{children}</div>
}
