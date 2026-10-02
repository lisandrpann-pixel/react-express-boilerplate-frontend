import { memo } from 'react'
import styles from './Header.module.css'

export const Header = memo(() => {
  return (
    <div className={styles.root}>
      <h1>ids</h1>
    </div>
  )
})
