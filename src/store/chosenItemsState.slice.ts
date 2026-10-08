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
    loadItems: (
      chosenItemsState,
      action: PayloadAction<ItemsState['value']>
    ) => {
      chosenItemsState.value = [...chosenItemsState.value, ...action.payload]

      chosenItemsState.value.sort(
        (itemLeft, itemRight) => itemLeft.order - itemRight.order
      )
    },

    refetchItems: (
      chosenItemsState,
      action: PayloadAction<ItemsState['value']>
    ) => {
      chosenItemsState.value = action.payload
    },

    filterItems: (
      chosenItemsState,
      action: PayloadAction<ItemsState['value']>
    ) => {
      chosenItemsState.value = action.payload
    },

    reOrderItem: (
      itemsState,
      action: PayloadAction<{
        fromIndex: number
        toIndex: number
        fromNewOrder: number
      }>
    ) => {
      const { fromIndex, toIndex, fromNewOrder } = action.payload

      const fromItem = itemsState.value[fromIndex]

      fromItem.order = fromNewOrder

      itemsState.value.splice(fromIndex, 1)
      itemsState.value.splice(toIndex, 0, fromItem)
    },
  },
})

export const {
  refetchItems: refetchChosenItemsAction,
  loadItems: loadChosenItemsAction,
  filterItems: filterChosenItemsAction,
  reOrderItem: reOrderItemChosenItemsAction,
} = chosenItemsSlice.actions

export const selectChosenItems = (rootState: RootState) =>
  rootState.chosenItemsState.value

export default chosenItemsSlice.reducer
