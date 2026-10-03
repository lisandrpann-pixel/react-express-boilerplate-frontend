import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import { type BaseQueryFn } from '@reduxjs/toolkit/query/react'
import { StatusCodes } from 'http-status-codes'
import { toastError, toastWarning } from '@/utils/notifications.utils'

export const axiosInstance = axios.create({})

axiosInstance.interceptors.request.use(
    function (config) {
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    function (response) {
        return response
    },
    function (err) {
        const error = err as AxiosError<{ error: string }>

        switch (error.status) {
            case StatusCodes.NOT_FOUND:
                toastWarning(error.response?.data.error)

                break
            default:
                toastError(error.response?.data.error)

                break
        }

        return Promise.reject(error)
    }
)

export const axiosBaseQuery =
    (): BaseQueryFn<
        {
            url: string
            method?: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
            body?: AxiosRequestConfig['data']
        },
        unknown,
        unknown
    > =>
    async ({ url, method, data, params, body }) => {
        try {
            const payload = data ?? body

            const result = await axiosInstance({
                url,
                method,
                data: payload,
                params,
            })

            return { data: result.data }
        } catch (axiosError) {
            return {
                error: axiosError,
            }
        }
    }
