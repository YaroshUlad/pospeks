import { ApiHelper } from '@/core/api/api.ts'
import { DeformationModel } from '@/models/deformation.model.ts'

export const DeformationService = (api: ApiHelper) => ({
  fetchDeformations: async () => {
    return api.get<DeformationResponse>('deformation')
  },
})

export interface DeformationResponse {
  currentPage: number
  pageSize: number
  totalPages: number
  totalRecords: number
  hasPrevious: boolean
  hasNext: boolean
  data: DeformationModel[]
  succeeded: boolean
  errors: string[]
}
