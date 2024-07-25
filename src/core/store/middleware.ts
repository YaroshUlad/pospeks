import { deformationApi } from '@/modules/deformation/deformation.api.ts'
import { termoApi } from '@/modules/termo/termo.api.ts'

export const middleware = [deformationApi.middleware, termoApi.middleware]
