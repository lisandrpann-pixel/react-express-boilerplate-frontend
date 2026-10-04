import styles from './Home.module.css'
import { AllItemsColumn } from './components/ItemsColumn'
import { ChosenItemsColumn } from './components/ChosenItemsColumns'
import { useLazyGetApiItemsQuery, type GetApiItemsApiArg } from '@/api'
import { useCallback, useState } from 'react'
import { Loader } from '@/components/Loader'

export const Home = () => {
  const [isLoadingData, setLoadingData] = useState(true)
  
  const [getItems, { data: dataGetItems, isSuccess: isSuccessGetItems }] = useLazyGetApiItemsQuery()
  const [getItemsChosen, { data: dataGetItemsChosen, isSuccess: isSuccessGetItemsChosen }] = useLazyGetApiItemsQuery()
  
  const hasMoreItems = dataGetItems?.pagination.hasMore
  const hasMoreChosenItems = dataGetItemsChosen?.pagination.hasMore
  
  const getItemsWithFilters = useCallback((props: GetApiItemsApiArg) => 
      getItemsChosen({ ...props, isChosenFilter: true }), [getItemsChosen])

  const switchOnLoader = useCallback(() => {
    setLoadingData(true)
  }, [])

  const switchOffLoader = useCallback(() => {
    setLoadingData(false)
  }, [])

  const isSuccessRequest = isSuccessGetItems && isSuccessGetItemsChosen

  return (
    <div className={styles.root}>
      <Loader isLoading={isLoadingData} isSuccess={isSuccessRequest}>
        <main className={styles.main}>
          <AllItemsColumn 
            getItems={getItems} 
            switchOnLoader={switchOnLoader}
            switchOffLoader={switchOffLoader}
            hasMore={hasMoreItems}
            isLoadingData={isLoadingData}
          />

          <ChosenItemsColumn
            getItems={getItemsWithFilters} 
            switchOnLoader={switchOnLoader}
            switchOffLoader={switchOffLoader}
            hasMore={hasMoreChosenItems}
            isLoadingData={isLoadingData}
          />
        </main>
      </Loader>
    </div>
  )
}
