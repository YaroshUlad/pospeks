import { createApi } from '@reduxjs/toolkit/query/react'

import { BASE_URL } from '@/core/config'

import { apiBaseQuery } from '@/core/api/api.query'

import { DeformationResponse } from '@/modules/deformation/deformation.service.ts'
import { DeformationModel } from '@/models/deformation.model.ts'

export const deformationApi = createApi({
  reducerPath: 'deformationApi',
  baseQuery: apiBaseQuery({ baseUrl: `${BASE_URL}` }),
  tagTypes: [],
  endpoints: (builder) => ({
    getDeformationsForTable: builder.query<DeformationModel[], void>({
      query: () => ({
        url: 'deformation',
        method: 'GET',
      }),
      transformResponse: (response: DeformationResponse) => {
        return response.data
      },
    }),
  }),
})

export const { useGetDeformationsForTableQuery } = deformationApi
