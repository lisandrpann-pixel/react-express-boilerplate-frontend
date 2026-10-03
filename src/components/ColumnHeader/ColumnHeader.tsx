import { type FC } from 'react'
import type { ColumnHeaderProps } from './ColumnHeader.types'
import styles from './ColumnHeader.module.css'

export const ColumnHeader: FC<ColumnHeaderProps> = ({ children }) => {
  return <div className={styles.root}>{children}</div>
}
