import { Inter } from 'next/font/google'
import { Box, Container, Link, Typography } from '@mui/material'
import dynamic from 'next/dynamic'

const ImgToPdf = dynamic(() => import('../components/screens/img-to-pdf'), {
  ssr: false,
})

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return <ImgToPdf />
}
