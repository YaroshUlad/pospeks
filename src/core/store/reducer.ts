import { deformationApi } from '@/modules/deformation/deformation.api.ts'
import { termoApi } from '@/modules/termo/termo.api.ts'
import { dateFilterSlice } from '@/modules/dateFilter/dateFilter.slice.ts'

export const reducer = {
  filter: dateFilterSlice.reducer,
  [deformationApi.reducerPath]: deformationApi.reducer,
  [termoApi.reducerPath]: termoApi.reducer,
}
