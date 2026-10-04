import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { SLICES_NAMES } from './slices.consts'

export interface SharedFlagsState {
  value: {
    hasToRefetchChosenItems: boolean
  }
}

const initialState: SharedFlagsState = {
  value: {
    hasToRefetchChosenItems: false
  },
}

export const sharedFlagsSlice = createSlice({
  name: SLICES_NAMES.sharedFlagsState,
  initialState,
  reducers: {
    setHasToRefetchChosenItems: (sharedFlagsState, action: PayloadAction<boolean>) => {
      sharedFlagsState.value.hasToRefetchChosenItems = action.payload
    },
  },
})

export const {
  setHasToRefetchChosenItems: setHasToRefetchChosenItemsAction,
} = sharedFlagsSlice.actions

export const selectHasToRefetchChosenItems = (rootState: RootState) =>
  rootState.sharedFlagsState.value.hasToRefetchChosenItems

export default sharedFlagsSlice.reducer
