import { ApiHelper } from '@/core/api/api.ts'
import { TermoModel } from '@/models/termo.model.ts'

export const TermoService = (api: ApiHelper) => ({
  fetchTermo: async () => {
    return api.get<TermoResponse>('termo')
  },
})

export interface TermoResponse {
  currentPage: number
  pageSize: number
  totalPages: number
  totalRecords: number
  hasPrevious: boolean
  hasNext: boolean
  data: TermoModel[]
  succeeded: boolean
  errors: string[]
}
