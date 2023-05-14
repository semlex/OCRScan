import { createAsyncThunk } from '@reduxjs/toolkit'
import { endpoints } from '@/api/endpoints'

export const imgToPdf = createAsyncThunk(
  'ocr/imgToPdf',
  async (payload: FormData) => {
    const response = await endpoints.ocr.imgToPdf(payload)
    return response.data
  }
)

export const makeSearchablePdf = createAsyncThunk(
  'ocr/makeSearchablePdf',
  async (payload: FormData) => {
    const response = await endpoints.ocr.makeSearchablePdf(payload)
    return response.data
  }
)
