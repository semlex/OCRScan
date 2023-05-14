import React, { FC, ReactElement } from 'react'
import {
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import PlagiarismIcon from '@mui/icons-material/Plagiarism'
import { useHomeStyles } from '@/components/screens/home/styles'

const Home: FC = (): ReactElement => {
  const classes = useHomeStyles()

  return (
    <Container sx={{ paddingY: '20px' }}>
      <Typography variant="h5">Функционал приложения</Typography>
      <List>
        <ListItem
          className={classes.listItem}
          component={Link}
          href="/img-to-pdf"
        >
          <ListItemIcon>
            <PictureAsPdfIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText
            primary="Изображение в PDF"
            secondary="Преобразование изображения в отсканированный PDF"
          />
        </ListItem>
        <ListItem
          className={classes.listItem}
          component={Link}
          href="/img-to-text"
        >
          <ListItemIcon>
            <TextSnippetIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText
            primary="Изображение в текст"
            secondary="Извлечение текста из картинок"
          />
        </ListItem>
        <ListItem
          className={classes.listItem}
          component={Link}
          href="/searchable-pdf"
        >
          <ListItemIcon>
            <PlagiarismIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText
            primary="PDF с функцией поиска"
            secondary="Создание PDF с функцией поиска из отсканированного документа"
          />
        </ListItem>
      </List>
    </Container>
  )
}

export default Home
