import React, { FC, ReactElement } from 'react'
import { Container, List, ListItem, ListItemText } from '@mui/material'
import Link from 'next/link'
import { useHomeStyles } from '@/components/screens/home/styles'

const Home: FC = (): ReactElement => {
  const classes = useHomeStyles()

  return (
    <Container>
      <List>
        <ListItem
          className={classes.listItem}
          component={Link}
          href="/img-to-pdf"
        >
          <ListItemText primary="Изображение в PDF" />
        </ListItem>
      </List>
    </Container>
  )
}

export default Home
