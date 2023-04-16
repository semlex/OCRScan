// import '@/styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '@/utlis/createEmotionCache'
import { store } from '../store/store'
import { Provider } from 'react-redux'
import { theme } from '@/styles/theme'
import { Layout } from '@/components/layout'
import Head from 'next/head'

const clientSideEmotionCache = createEmotionCache()

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <Head>
            <title>OCRScan</title>
          </Head>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  )
}
