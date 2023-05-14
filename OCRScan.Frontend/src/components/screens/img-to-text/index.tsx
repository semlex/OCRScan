import React, { FC, ReactElement, useEffect } from 'react'
import { object, TypeOf, z } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from '@mui/material'
import { FileUpload } from '@/components/common/file-upload'
import { SelectLanguages } from '@/components/common/select-laguages'
import { ocrApi } from '@/store/api/ocr.api'
import { CheckboxField } from '@/components/common/checkbox-field'

const imageUploadSchema = object({
  image: z.instanceof(File),
  languages: z
    .object({
      code: z.string(),
      name: z.string(),
    })
    .array()
    .min(1),
  filters: z.boolean(),
})

type IUploadImage = TypeOf<typeof imageUploadSchema>

const ImgToText: FC = (): ReactElement => {
  const methods = useForm<IUploadImage>({
    resolver: zodResolver(imageUploadSchema),
    defaultValues: {
      filters: false,
    },
  })

  const [imgToText, { data, isLoading }] = ocrApi.useImgToTextMutation()

  const onSubmit: SubmitHandler<IUploadImage> = (values: IUploadImage) => {
    const formData = new FormData()
    formData.append('img', values.image)

    imgToText(formData)
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <Container sx={{ paddingY: '20px' }}>
      {!isLoading ? (
        <>
          <FormProvider {...methods}>
            <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FileUpload name="image" multiple={false} limit={1} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SelectLanguages />
                </Grid>
                <Grid item xs={12}>
                  <CheckboxField name="filters" label="Применить фильтры" />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" type="submit">
                    Старт
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </FormProvider>
          {data && (
            <TextField
              label="Извлеченный текст"
              fullWidth
              multiline
              value={data.text}
              sx={{ mt: '15px' }}
            />
          )}
        </>
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <Grid item>
            <CircularProgress size={80} />
          </Grid>
        </Grid>
      )}
    </Container>
  )
}

export default ImgToText
