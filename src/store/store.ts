import { api } from '@/api'
import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from './itemsState.slice'
import chosenItemsReducer from './chosenItemsState.slice'
import sharedFlagsReducer from './sharedFlagsState.slice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    itemsState: itemsReducer,
    chosenItemsState: chosenItemsReducer,
    sharedFlagsState: sharedFlagsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
