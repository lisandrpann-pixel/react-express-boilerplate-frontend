import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './axios.config'

export const emptySplitApi = createApi({
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
})
