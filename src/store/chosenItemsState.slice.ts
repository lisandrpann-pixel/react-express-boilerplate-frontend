import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { GetApiItemsByIdApiResponse } from '@/api'
import { SLICES_NAMES } from './slices.consts'
import { chooseItemAction } from './itemsState.slice'
import { mergeItems } from '@/utils/common.utils'

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
      chosenItemsState.value = mergeItems(chosenItemsState.value, action.payload)

      chosenItemsState.value.sort((itemLeft, itemRight) => itemLeft.order - itemRight.order)
    },

    filterItems: (itemsState, action: PayloadAction<ItemsState['value']>) => {
      itemsState.value = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(chooseItemAction, (chosenItemsState, action) => {
      if (action.payload.isChosen) {
        chosenItemsState.value = chosenItemsState.value.filter((item) => item.id !== action.payload.id)
      } else {
        chosenItemsState.value.push({
          ...action.payload,
          isChosen: true
        })
      }
      
      chosenItemsState.value.sort((itemLeft, itemRight) => itemLeft.order - itemRight.order)
    })
  },
})

export const {
  loadItems: loadChosenItemsAction,
  filterItems: filterChosenItemsAction,
} = chosenItemsSlice.actions

export const selectChosenItems = (rootState: RootState) =>
  rootState.chosenItemsState.value

export default chosenItemsSlice.reducer
