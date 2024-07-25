import { createApi } from '@reduxjs/toolkit/query/react'

import { BASE_URL } from '@/core/config'

import { apiBaseQuery } from '@/core/api/api.query'

import { TermoResponse } from '@/modules/termo/termo.service.ts'
import { TermoModel } from '@/models/termo.model.ts'

export const termoApi = createApi({
  reducerPath: 'termoApi',
  baseQuery: apiBaseQuery({ baseUrl: `${BASE_URL}` }),
  tagTypes: [],
  endpoints: (builder) => ({
    getTermoForTable: builder.query<TermoModel[], void>({
      query: () => ({
        url: 'termo',
        method: 'GET',
      }),
      transformResponse: (response: TermoResponse) => {
        return response.data
      },
    }),
  }),
})

export const { useGetTermoForTableQuery } = termoApi
