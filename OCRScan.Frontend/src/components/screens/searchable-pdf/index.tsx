import React, { FC, ReactElement } from 'react'
import { useAppSelector, useAppDispatch } from '@/hooks/redux'
import { Box, Button, CircularProgress, Container, Grid } from '@mui/material'
import { FileUpload } from '@/components/common/file-upload'
import { TypeOf, object, z } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectLanguages } from '@/components/common/select-laguages'
import { makeSearchablePdf } from '@/store/ocr/ocr.actions'
import { CheckboxField } from '@/components/common/checkbox-field'

const imageUploadSchema = object({
  pdfDocument: z.instanceof(File),
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

const SearchablePdf: FC = (): ReactElement => {
  const methods = useForm<IUploadImage>({
    resolver: zodResolver(imageUploadSchema),
    defaultValues: {
      filters: false,
    },
  })

  const isLoading = useAppSelector((state) => state.ocr.isLoading)
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<IUploadImage> = (values: IUploadImage) => {
    const formData = new FormData()
    formData.append('pdf', values.pdfDocument)

    dispatch(makeSearchablePdf(formData))
  }

  return (
    <Container sx={{ paddingY: '20px' }}>
      {!isLoading ? (
        <FormProvider {...methods}>
          <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FileUpload
                  name="pdfDocument"
                  multiple={false}
                  limit={1}
                  fileType="pdf"
                />
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

export default SearchablePdf
