import styles from './Empty.module.css'
import { type FC } from 'react'
import type { EmptyProps } from './Empty.types'
import classNames from 'classnames'

export const Empty: FC<EmptyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h3
      {...props}
      className={classNames(styles.root, className)}
    >
      {children}
    </h3>
  )
}
