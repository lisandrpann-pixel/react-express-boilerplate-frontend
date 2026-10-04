import { api } from '@/api'
import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './itemsState.slice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    itemsState: usersReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store