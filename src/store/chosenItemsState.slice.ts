import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { GetApiItemsByIdApiResponse } from '@/api'
import { SLICES_NAMES } from './slices.consts'

export interface ItemsState {
  value: GetApiItemsByIdApiResponse[]
}

const initialState: ItemsState = {
  value: [],
}

export const chosenItemsSlice = createSlice({
  name: SLICES_NAMES.chosenItemsState,
  initialState,
  reducers: {
    loadItems: (chosenItemsState, action: PayloadAction<ItemsState['value']>) => {
      chosenItemsState.value = [...chosenItemsState.value, ...action.payload]

      chosenItemsState.value.sort((itemLeft, itemRight) => itemLeft.order - itemRight.order)
    },

    refetchItems: (chosenItemsState, action: PayloadAction<ItemsState['value']>) => {
      chosenItemsState.value = action.payload
    },

    filterItems: (chosenItemsState, action: PayloadAction<ItemsState['value']>) => {
      chosenItemsState.value = action.payload
    },
  },
})

export const {
  refetchItems: refetchChosenItemsAction,
  loadItems: loadChosenItemsAction,
  filterItems: filterChosenItemsAction,
} = chosenItemsSlice.actions

export const selectChosenItems = (rootState: RootState) =>
  rootState.chosenItemsState.value

export default chosenItemsSlice.reducer
