import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  isAxiosError,
} from 'axios'

import { BASE_URL } from '../config'
import { IApiErrorResponse } from '@/core/api/api'

const INTERNAL_SERVER_ERROR = {
  code: -1,
  msg: 'Internal Server Error',
}

class ApiBaseHelper {
  static #instance: ApiBaseHelper | null = null

  #api: AxiosInstance | null = null

  constructor() {
    this.#api = axios.create({ baseURL: BASE_URL })
  }

  public getApi(url?: string) {
    if (!url) return this.#api
    return axios.create({
      baseURL: url,
    })
  }

  public static getInstance(): ApiBaseHelper {
    if (!ApiBaseHelper.#instance) {
      ApiBaseHelper.#instance = new ApiBaseHelper()
    }

    return ApiBaseHelper.#instance
  }

  request<T>(args: AxiosRequestConfig) {
    if (!this.#api) throw new Error('API is not defined')

    return this.#api.request<T>(args)
  }

  post<T>(url: string, args: Omit<AxiosRequestConfig, 'method'> = {}) {
    return this.request<T>({ url, method: 'POST', ...args })
  }

  get<T>(url: string, args: Omit<AxiosRequestConfig, 'method'> = {}) {
    return this.request<T>({ url, method: 'GET', ...args })
  }

  patch<T>(url: string, args: Omit<AxiosRequestConfig, 'method'> = {}) {
    return this.request<T>({ url, method: 'PATCH', ...args })
  }

  delete<T>(url: string, args: Omit<AxiosRequestConfig, 'method'> = {}) {
    return this.request<T>({ url, method: 'DELETE', ...args })
  }

  put<T>(url: string, args: Omit<AxiosRequestConfig, 'method'> = {}) {
    return this.request<T>({ url, method: 'PUT', ...args })
  }

  resolveError(e: unknown): IApiErrorResponse {
    if (isAxiosError(e)) {
      const error = e as AxiosError<IApiErrorResponse>
      const response = error.response as AxiosResponse<IApiErrorResponse>
      return response.data || INTERNAL_SERVER_ERROR
    }

    return INTERNAL_SERVER_ERROR
  }
}

export default ApiBaseHelper
