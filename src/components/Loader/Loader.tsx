import { type FC } from "react"
import type { LoaderProps } from "./Loader.types"
import styles from './Loader.module.css'

import LoaderIcon from '@/assets/loader.svg?react'
import classNames from "classnames"

export const Loader: FC<LoaderProps> = ({
  children,
  isLoading,
  isSuccess,
}) => {
  return (
    <>
      <div 
        className={
          classNames(
            styles.loader, 
            styles.visibilityOff, 
            isLoading && styles.visibilityOn
          )
        }
      >
        <LoaderIcon />
      </div>

      <div 
        className={
          classNames(
            styles.main, 
            styles.visibilityOff, 
            isSuccess && styles.visibilityOn
            )
          }
        >
          {children}
      </div>
    </>
  )
}
