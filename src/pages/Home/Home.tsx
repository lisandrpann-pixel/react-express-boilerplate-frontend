import { useGetUsersQuery } from '@/api'
import { Card } from '@/components/Card'
import { Column } from '@/components/Column'
import { Header } from '@/components/Header'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import styles from './Home.module.css'
import { Loader } from '@/components/Loader'

export const Home = () => {
  const { data, isLoading, isSuccess } = useGetUsersQuery({})

  const { data: users } = data || {}

  return (
    <div className={styles.root}>
      <Header />

      <DndProvider backend={HTML5Backend}>
        <Loader isLoading={isLoading} isSuccess={isSuccess}>
          <main className={styles.main}>
            <Column>
              {users?.map((user) => (
                <Card {...user} key={user._id} />
              ))}
            </Column>

            <Column>
              {users?.map((user) => (
                <Card {...user} key={user._id} />
              ))}
            </Column>
          </main>
        </Loader>
      </DndProvider>
    </div>
  )
}