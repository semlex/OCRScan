import { api } from '@/store/api/api'
import { ILanguage } from '@/api/types'

export const languageApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAll: build.query<ILanguage[], void>({
      query: () => ({
        url: '/language/getAll',
        method: 'GET',
      }),
      providesTags: ['Language'],
    }),
  }),
  overrideExisting: false,
})
