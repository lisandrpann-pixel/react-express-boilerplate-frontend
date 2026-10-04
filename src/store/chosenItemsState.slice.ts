import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { GetApiItemsApiResponse, GetApiItemsByIdApiResponse } from '@/api'

export interface ChosenItemsState {
  value: {
    items: GetApiItemsByIdApiResponse[]
    pagination: Omit<GetApiItemsApiResponse['pagination'], 'total'> & {
      total?: number
    }
  }
}

const initialState: ChosenItemsState = {
  value: {
    items: [],
    pagination: {
      offset: 0,
      hasMore: false,
      limit: 20,
    }
  }
}

export const chosenItemsSlice = createSlice({
  name: 'chosenItemsState',
  initialState,
  reducers: {
    loadItems: (itemsState, action: PayloadAction<ChosenItemsState['value']>) => {
      itemsState.value.items = [
        ...itemsState.value.items,
        ...action.payload.items
      ]

      itemsState.value.pagination = {
        ...action.payload.pagination,
        offset: action.payload.pagination.hasMore
          ? itemsState.value.pagination.offset + action.payload.pagination.limit
          : itemsState.value.pagination.offset
      }
    },

    filterItems: (itemsState, action: PayloadAction<ChosenItemsState['value']>) => {
      itemsState.value.items = action.payload.items

      itemsState.value.pagination = {
        ...action.payload.pagination,
        offset: initialState.value.pagination.limit
      }
    },

    addItem: (itemsState, action: PayloadAction<ChosenItemsState['value']>) => {
      itemsState.value.items = action.payload.items

      itemsState.value.pagination = {
        ...action.payload.pagination,
        offset: initialState.value.pagination.limit
      }
    },

    chooseItem: (itemsState, action: PayloadAction<number>) => {
      const item = itemsState.value.items.find((item) => item.id === action.payload)
      
      if (item) {
        item.isChosen = !item.isChosen
      }
    }
  }
})

export const { chooseItem } = chosenItemsSlice.actions

export const selectItems = (rootState: RootState) => rootState.itemsState.value

export default chosenItemsSlice.reducer