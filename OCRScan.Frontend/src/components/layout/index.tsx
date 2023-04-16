import React, { FC, ReactElement, ReactNode } from 'react'
import { Header } from '@/components/layout/header'
import { Box } from '@mui/material'

type Props = {
  children: ReactNode
}

export const Layout: FC<Props> = ({ children }: Props): ReactElement => {
  return (
    <>
      <Header />
      <Box sx={{ mt: '80px' }}>{children}</Box>
    </>
  )
}
