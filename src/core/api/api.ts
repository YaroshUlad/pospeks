import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

import ApiBaseHelper from './api.base'

import { DeformationService } from '@/modules/deformation/deformation.service.ts'
import { TermoService } from '@/modules/termo/termo.service.ts'

interface ExtendedConfig extends AxiosRequestConfig {
  isRetry?: boolean
}

export interface IApiErrorResponse {
  code: number | string
  msg: string
}

export class ApiHelper extends ApiBaseHelper {
  static #instance: ApiHelper | null = null

  #api: AxiosInstance | null = null

  static onRequestFullFilled(config: AxiosRequestConfig) {
    const configCopy = { ...config }
    return configCopy as InternalAxiosRequestConfig
  }

  static onRequestRejected = (error: AxiosError) => Promise.reject(error)

  static async onResponseFullFilled(response: AxiosResponse) {
    return response
  }

  private async onResponseRejected(error: AxiosError) {
    const originalRequest = error.config as ExtendedConfig

    if (error.response?.status === 401 && !originalRequest.isRetry) {
      // todo: unauthorized logic
    }

    return Promise.reject(error)
  }

  constructor() {
    super()

    this.#api = this.getApi()

    this.#api?.interceptors.request.use(ApiHelper.onRequestFullFilled, ApiHelper.onRequestRejected)

    this.#api?.interceptors.response.use(
      ApiHelper.onResponseFullFilled,
      this.onResponseRejected.bind(this),
    )
  }

  public static getInstance(): ApiHelper {
    if (!ApiHelper.#instance) {
      ApiHelper.#instance = new ApiHelper()
    }

    return ApiHelper.#instance
  }

  get services() {
    return {
      deformation: DeformationService(this),
      termo: TermoService(this),
    }
  }
}

export default ApiHelper.getInstance()
