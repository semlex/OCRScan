import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === 'production'
        ? '/api'
        : 'http://localhost:5555/api',
  }),
  endpoints: () => ({}),
})
