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

export const itemsSlice = createSlice({
  name: SLICES_NAMES.itemsState,
  initialState,
  reducers: {
    loadItems: (itemsState, action: PayloadAction<ItemsState['value']>) => {
      itemsState.value = [...itemsState.value, ...action.payload]
    },

    filterItems: (itemsState, action: PayloadAction<ItemsState['value']>) => {
      itemsState.value = action.payload
    },

    addItem: (itemsState, action: PayloadAction<ItemsState['value']>) => {
      itemsState.value = action.payload
    },

    chooseItem: (
      itemsState,
      action: PayloadAction<GetApiItemsByIdApiResponse>
    ) => {
      const item = itemsState.value.find(
        (item) => item.id === action.payload.id
      )

      if (item) {
        item.isChosen = !item.isChosen
        item.order = item.id
      }
    },
  },
})

export const {
  chooseItem: chooseItemAction,
  loadItems: loadItemsAction,
  filterItems: filterItemsAction,
  addItem: addItemAction,
} = itemsSlice.actions

export const selectItems = (rootState: RootState) => rootState.itemsState.value

export default itemsSlice.reducer
