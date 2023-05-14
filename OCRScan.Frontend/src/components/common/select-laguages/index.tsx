import React, { FC, ReactElement, SyntheticEvent, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Controller, useController, useFormContext } from 'react-hook-form'
import { Autocomplete, FormHelperText, TextField } from '@mui/material'
import { languageApi } from '@/store/api/language.api'

interface IOption {
  code: string
  title: string
}

export const SelectLanguages: FC = (): ReactElement => {
  const {
    control,
    formState: { isSubmitting, errors },
  } = useFormContext()

  const { field } = useController({ name: 'languages', control })

  const { data, isLoading } = languageApi.useGetAllQuery()

  useEffect(() => {
    if (field.value) {
      const langCodes = field.value.map((option: IOption) => option.code)
      Cookies.set('languages', JSON.stringify(langCodes))
    }
  }, [isSubmitting])

  const onAutocompleteChange = (event: SyntheticEvent, value: IOption[]) => {
    field.onChange(value)
  }

  return (
    <>
      {!isLoading && (
        <Controller
          name="languages"
          control={control}
          render={({ field: { value } }) => (
            <Autocomplete
              value={value}
              multiple
              options={data || []}
              getOptionLabel={(option) => option.name}
              onChange={onAutocompleteChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Языки"
                  placeholder="Выберите язык"
                />
              )}
            />
          )}
        />
      )}

      <FormHelperText
        sx={{ textAlign: 'center', my: 1 }}
        error={!!errors['languages']}
      >
        {errors['languages'] ? 'Необходимо выбрать языки' : ''}
      </FormHelperText>
    </>
  )
}
