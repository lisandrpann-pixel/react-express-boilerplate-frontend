import styles from './Home.module.css'
import { ItemsColumn } from './components/ItemsColumn'
import { ChosenItemsColumn } from './components/ChosenItemsColumns'

export const Home = () => {
  return (
    <main className={styles.main}>
      <ItemsColumn />

      <ChosenItemsColumn />
    </main>
  )
}
