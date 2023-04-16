import { combineReducers } from 'redux'
import { api } from '@/store/api/api'

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
})
