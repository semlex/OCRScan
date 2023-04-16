import { Axios } from './axios'
import { FileResponse } from '@/api/types'

export const endpoints = {
  ocr: {
    imgToPdf: (data: FormData): Promise<FileResponse> =>
      Axios.post('/ocr/imgToPdf', data, { responseType: 'blob' }),
  },
}
