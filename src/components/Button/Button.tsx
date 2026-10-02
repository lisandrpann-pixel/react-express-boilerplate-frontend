import styles from './Button.module.css'
import { memo, type FC } from 'react'
import type { ButtonProps } from './Button.types'
import classNames from 'classnames'

export const Button: FC<ButtonProps> = memo(
  ({ children, className, viewType = 'square', ...props }) => {
    return (
      <button {...props} className={classNames(styles.root, className, styles[viewType] )}>
        {children}
      </button>
    )
  }
)
