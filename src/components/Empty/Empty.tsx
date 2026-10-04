import styles from './Empty.module.css'
import { memo, type FC } from 'react'
import type { EmptyProps } from './Empty.types'
import classNames from 'classnames'

export const Empty: FC<EmptyProps> = memo(
  ({ children, className, ...props }) => {
    return (
      <h3 {...props} className={classNames(styles.root, className)}>
        {children || 'Пока не добавлено ни одной записи'}
      </h3>
    )
  }
)
