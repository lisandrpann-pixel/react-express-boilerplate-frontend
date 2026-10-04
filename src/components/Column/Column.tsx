import type { ColumnProps } from './Column.types'
import styles from './Column.module.css'
import { forwardRef } from 'react'
import classNames from 'classnames'

export const Column = forwardRef<HTMLDivElement, ColumnProps>(
  ({ children, className }, ref) => (
    <div className={classNames(styles.root, className)} ref={ref}>
      {children}
    </div>
  )
)
