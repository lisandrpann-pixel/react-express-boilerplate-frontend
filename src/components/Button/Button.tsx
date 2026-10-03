import styles from './Button.module.css'
import { type FC } from 'react'
import type { ButtonProps } from './Button.types'
import classNames from 'classnames'

export const Button: FC<ButtonProps> = ({
  children,
  className,
  viewType = 'square',
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(styles.root, className, styles[viewType])}
    >
      {children}
    </button>
  )
}
