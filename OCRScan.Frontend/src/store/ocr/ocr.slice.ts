import { createSlice } from '@reduxjs/toolkit'
import { imgToPdf } from '@/store/ocr/ocr.actions'
import { saveAs } from 'file-saver'

const initialState = {
  isLoading: false,
}

export const ocrSlice = createSlice({
  name: 'ocr',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(imgToPdf.pending, (state) => {
        state.isLoading = true
      })
      .addCase(imgToPdf.fulfilled, (state, { payload }) => {
        state.isLoading = false
        saveAs(payload, 'result.pdf')
      })
      .addCase(imgToPdf.rejected, (state) => {
        state.isLoading = false
      })
  },
})
