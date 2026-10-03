import styles from './Input.module.css'
import { type FC } from 'react'
import type { InputProps } from './Input.types'
import classNames from 'classnames'

export const Input: FC<InputProps> = ({ className, ...props }) => {
  return <input className={classNames(styles.root, className)} {...props} />
}
