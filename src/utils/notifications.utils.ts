import { TOAST_CONFIG } from '@/configs/notifications.config'
import { toast, type ToastContent, type ToastOptions } from 'react-toastify'

export const toastSuccess = (
  message?: ToastContent,
  config: ToastOptions = {}
) => {
  toast.success(message, { ...TOAST_CONFIG, ...config })
}

export const toastError = (
  message?: ToastContent,
  config: ToastOptions = {}
) => {
  toast.error(message, { ...TOAST_CONFIG, ...config })
}

export const toastInfo = (
  message?: ToastContent,
  config: ToastOptions = {}
) => {
  toast.info(message, { ...TOAST_CONFIG, ...config })
}

export const toastWarning = (
  message?: ToastContent,
  config: ToastOptions = {}
) => {
  toast.warning(message, { ...TOAST_CONFIG, ...config })
}
