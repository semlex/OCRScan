import React, { FC, ReactElement } from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'
import { DocumentScanner } from '@mui/icons-material'
import Link from 'next/link'

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
          component={Link}
          href="/"
        >
          OCRScan
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
