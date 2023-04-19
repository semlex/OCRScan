import { Axios } from './axios'
import { FileResponse } from '@/api/types'

export const endpoints = {
  ocr: {
    imgToPdf: (payload: FormData): Promise<FileResponse> =>
      Axios.post('/ocr/imgToPdf', payload, { responseType: 'blob' }),
  },
}
