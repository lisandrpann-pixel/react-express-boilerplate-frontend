import styles from './Home.module.css'
import { AllUsersColumn } from './components/AllUsersColumn'
import { ChosenUsersColumn } from './components/ChosenUsersColumn'
import { useLazyGetApiUsersQuery, type GetApiUsersApiArg } from '@/api'
import { useCallback, useState } from 'react'
import { Loader } from '@/components/Loader'

export const Home = () => {
  const [isLoadingData, setLoadingData] = useState(true)
  
  const [getUsers, { data: dataGetUsers, isSuccess: isSuccessGetUsers }] = useLazyGetApiUsersQuery()

  const hasMoreUsers = dataGetUsers?.pagination.hasMore

  const [getUsersChosen, { data: dataGetUsersChosen, isSuccess: isSuccessGetUsersChosen }] = useLazyGetApiUsersQuery()

  const hasMoreChosenUsers = dataGetUsersChosen?.pagination.hasMore

  const getUsersWithFilters = useCallback((props: GetApiUsersApiArg) => 
      getUsersChosen({ ...props, isChosenFilter: true }), [getUsersChosen])

  const switchOnLoader = useCallback(() => {
    setLoadingData(true)
  }, [])

  const switchOffLoader = useCallback(() => {
    setLoadingData(false)
  }, [])

  const isSuccessRequest = isSuccessGetUsers && isSuccessGetUsersChosen

  return (
    <div className={styles.root}>
      <Loader isLoading={isLoadingData} isSuccess={isSuccessRequest}>
        <main className={styles.main}>
          <AllUsersColumn 
            getUsers={getUsers} 
            getUsersChosen={getUsersWithFilters}
            switchOnLoader={switchOnLoader}
            switchOffLoader={switchOffLoader}
            hasMore={hasMoreUsers}
            isLoadingData={isLoadingData}
          />

          <ChosenUsersColumn
            getUsers={getUsersWithFilters} 
            switchOnLoader={switchOnLoader}
            switchOffLoader={switchOffLoader}
            hasMore={hasMoreChosenUsers}
            isLoadingData={isLoadingData}
          />
        </main>
      </Loader>
    </div>
  )
}
