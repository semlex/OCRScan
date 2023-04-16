import React, { FC, ReactElement, SyntheticEvent, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Controller, useController, useFormContext } from 'react-hook-form'
import { Autocomplete, FormHelperText, TextField } from '@mui/material'

interface IOption {
  langCode: string
  title: string
}

const options: IOption[] = [
  {
    langCode: 'rus',
    title: 'Русский',
  },
  {
    langCode: 'eng',
    title: 'Английский',
  },
]

export const SelectLanguages: FC = (): ReactElement => {
  const {
    control,
    formState: { isSubmitting, errors },
  } = useFormContext()

  const { field } = useController({ name: 'languages', control })

  useEffect(() => {
    if (field.value) {
      const langCodes = field.value.map((option: IOption) => option.langCode)
      Cookies.set('languages', JSON.stringify(langCodes))
    }
  }, [isSubmitting])

  const onAutocompleteChange = (event: SyntheticEvent, value: IOption[]) => {
    field.onChange(value)
  }

  return (
    <>
      <Controller
        name="languages"
        control={control}
        render={({ field: { value } }) => (
          <Autocomplete
            value={value}
            multiple
            options={options}
            getOptionLabel={(option) => option.title}
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

      <FormHelperText
        sx={{ textAlign: 'center', my: 1 }}
        error={!!errors['languages']}
      >
        {errors['languages'] ? 'Необходимо выбрать языки' : ''}
      </FormHelperText>
    </>
  )
}
