import { combineReducers } from 'redux'
import { api } from '@/store/api/api'
import { ocrSlice } from '@/store/ocr/ocr.slice'

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  ocr: ocrSlice.reducer,
})
