import { memo, type FC } from 'react'
import { type CardDndProps } from './Card.types'
import { Card } from './Card'
import styles from './Card.module.css'
import { useSortable } from '@dnd-kit/react/sortable'

export const CardDnd: FC<CardDndProps> = memo((props) => {
  const { id, index } = props

  const { ref } = useSortable({ id, index })

  return <Card {...props} dndRef={ref} className={styles.draggable} />
})
