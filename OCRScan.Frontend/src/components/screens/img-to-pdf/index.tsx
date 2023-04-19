import React, { FC, ReactElement, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/hooks/redux'
import { Box, Button, CircularProgress, Container, Grid } from '@mui/material'
import { FileUpload } from '@/components/common/file-upload'
import { TypeOf, object, z } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectLanguages } from '@/components/common/select-laguages'
import { imgToPdf } from '@/store/ocr/ocr.actions'

const imageUploadSchema = object({
  image: z.instanceof(File),
  languages: z
    .object({
      code: z.string(),
      title: z.string(),
    })
    .array()
    .min(1),
})

type IUploadImage = TypeOf<typeof imageUploadSchema>

const ImgToPdf: FC = (): ReactElement => {
  const methods = useForm<IUploadImage>({
    resolver: zodResolver(imageUploadSchema),
  })

  const isLoading = useAppSelector((state) => state.ocr.isLoading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log(methods.getValues())
    console.log(methods.formState.errors)
  }, [methods.formState.errors])

  const onSubmit: SubmitHandler<IUploadImage> = (values: IUploadImage) => {
    const formData = new FormData()
    formData.append('img', values.image)

    dispatch(imgToPdf(formData))
  }

  return (
    <Container sx={{ paddingY: '20px' }}>
      {!isLoading ? (
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
                <Button variant="contained" type="submit">
                  Старт
                </Button>
              </Grid>
            </Grid>
          </Box>
        </FormProvider>
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

export default ImgToPdf
