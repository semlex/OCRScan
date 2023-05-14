import { api } from '@/store/api/api'

export const ocrApi = api.injectEndpoints({
  endpoints: (build) => ({
    imgToText: build.mutation<{ text: string }, FormData>({
      query: (body) => ({
        url: '/ocr/imgToText',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
})
