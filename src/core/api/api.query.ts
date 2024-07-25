import { AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios'
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query'

import apiHelper from '@/core/api/api'

export interface ApiQuery {
  baseUrl: string
}

export interface ApiBaseQueryArgs {
  url: string
  method: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
  params?: AxiosRequestConfig['params']
  headers?: AxiosRequestConfig['headers']
}

export const apiBaseQuery =
  ({ baseUrl }: ApiQuery = { baseUrl: '/' }): BaseQueryFn<ApiBaseQueryArgs, unknown, unknown> =>
  async (args) => {
    const url = baseUrl + args.url

    try {
      const result = await apiHelper.request({ ...args, url })

      return { data: result.data }
    } catch (e) {
      const error = { status: 0, data: 'Unknown error' }

      if (isAxiosError(e)) {
        const response = e.response as AxiosResponse | undefined

        if (response && response.status === 401) {
          //  todo: logic for unAuthorized
        }

        if (response) {
          error.status = response.status || 0
          error.data = response.data || e.message
        }
      }

      return { error }
    }
  }
