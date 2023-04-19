import { createAsyncThunk } from '@reduxjs/toolkit'
import { endpoints } from '@/api/endpoints'

export const imgToPdf = createAsyncThunk(
  'ocr/imgToPdf',
  async (payload: FormData) => {
    const response = await endpoints.ocr.imgToPdf(payload)
    return response.data
  }
)
