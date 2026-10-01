import { useGetUsersQuery } from '@/api'
import { Card } from '@/components/Card'
import { Column } from '@/components/Column'
import { Header } from '@/components/Header'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import styles from './Home.module.css'
import Loader from '@/assets/loader.svg?react'

export const Home = () => {
  const { data, isLoading } = useGetUsersQuery({})

  const { data: users } = data || {}

  return (
    <div className={styles.root}>
      <Header />

      {isLoading && <Loader />}

      <main className={styles.main}>
        <Column>
          <DndProvider backend={HTML5Backend}>
            {users?.map((user) => (
              <Card {...user} key={user._id} />
            ))}
          </DndProvider>
        </Column>

        <Column>
          <DndProvider backend={HTML5Backend}>
            {users?.map((user) => (
              <Card {...user} key={user._id} />
            ))}
          </DndProvider>
        </Column>
      </main>
    </div>
  )
}