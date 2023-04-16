import React, { FC, ReactElement } from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'
import { DocumentScanner } from '@mui/icons-material'

export const Header: FC = (): ReactElement => {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ cursor: 'pointer' }}>
        <DocumentScanner sx={{ mr: 1, fontSize: '30px' }} />
        <Typography
          variant="h6"
          sx={{
            mr: 2,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '1px',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          OCRScan
        </Typography>

        {/*<Adb sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />*/}
        {/*<Typography*/}
        {/*  variant="h5"*/}
        {/*  noWrap*/}
        {/*  component="a"*/}
        {/*  href=""*/}
        {/*  sx={{*/}
        {/*    mr: 2,*/}
        {/*    display: { xs: 'flex', md: 'none' },*/}
        {/*    flexGrow: 1,*/}
        {/*    fontFamily: 'monospace',*/}
        {/*    fontWeight: 700,*/}
        {/*    letterSpacing: '.3rem',*/}
        {/*    color: 'inherit',*/}
        {/*    textDecoration: 'none',*/}
        {/*  }}*/}
        {/*>*/}
        {/*  LOGO*/}
        {/*</Typography>*/}
      </Toolbar>
    </AppBar>
  )
}
